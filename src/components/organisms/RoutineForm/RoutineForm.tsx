import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { View } from 'react-native';
import { BarbellIcon, FloppyDiskIcon, PlusIcon } from 'phosphor-react-native';
import { Button, IconButton, Text } from '@/components/atoms';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';
import { ExerciseRoutineItem, FormInput } from '@/components/molecules';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	RoutineFormInput,
	RoutineFormOutput,
	routineFormSchema
} from '@/modules/routine/validation/routineFormSchema';
import { patchRoutineById, postRoutine } from '@/modules/routine/services';
import { useThemeColors } from '@/hooks';
import { setFormError } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, RoutineResponse } from '@/infrastructure/interfaces';

interface RoutineFormProps {
	mode: 'create' | 'edit';
	routine?: RoutineResponse;
}

export const RoutineForm = ({ mode, routine }: RoutineFormProps) => {
	const router = useRouter();
	const colors = useThemeColors();
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const exercises = useRoutineStore((state) => state.exercises);
	const hasExercises = useRoutineStore((state) => state.hasExercises);
	const setExercises = useRoutineStore((state) => state.setExercises);
	const setSelectedExerciseIds = useRoutineStore(
		(state) => state.setSelectedExerciseIds
	);
	const setIsSelecting = useRoutineStore((state) => state.setIsSelecting);
	const clearRoutine = useRoutineStore((state) => state.clearRoutine);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		reset,
		formState: { errors }
	} = useForm<RoutineFormInput, FieldValues, RoutineFormOutput>({
		resolver: zodResolver(routineFormSchema),
		mode: 'onSubmit',
		defaultValues: {
			title: '',
			exercises: []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'exercises'
	});

	const exercisesError =
		errors.exercises?.message || errors.exercises?.root?.message;

	const { mutate: saveRoutine, isPending: loadingRoutine } = useMutation({
		mutationFn: async (data: RoutineFormOutput) => {
			if (mode === 'create') {
				return postRoutine(data);
			}
			const routineId = routine?.id;
			if (routineId) {
				return patchRoutineById(routineId, data);
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['routines']
			});
			const routineId = routine?.id;
			if (routineId) {
				await queryClient.invalidateQueries({
					queryKey: ['routine', routine.id]
				});
			}
			router.dismiss();
		},
		onError: (error: ApiError) => {
			const errorObj = error;
			setFormError(setError, errorObj);
		}
	});

	const onSaveRoutine = (data: RoutineFormOutput) => {
		saveRoutine(data);
	};

	const handleRemoveExercise = (index: number) => {
		const exerciseId = fields[index].exerciseId;
		const updatedExercises = exercises.filter(
			(exercise) => exercise.id !== exerciseId
		);
		remove(index);
		setExercises(updatedExercises);
		setSelectedExerciseIds(updatedExercises.map(({ id }) => id));
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					onPress={handleSubmit(onSaveRoutine)}
					disabled={!hasExercises()}
					loading={loadingRoutine}
				>
					<FloppyDiskIcon color={colors.primary} />
				</IconButton>
			)
		});
	}, [loadingRoutine]);

	useEffect(() => {
		const desiredExerciseIds = new Set(exercises.map(({ id }) => id));

		const indexToRemove = fields.findIndex(
			({ exerciseId }) => !desiredExerciseIds.has(exerciseId)
		);

		if (indexToRemove !== -1) {
			remove(indexToRemove);
			return;
		}

		if (exercises.length === 0) {
			clearErrors('exercises');
			return;
		}

		const currentExerciseIds = new Set(
			fields.map(({ exerciseId }) => exerciseId)
		);

		const exercisesToAppend = exercises
			.filter(({ id }) => !currentExerciseIds.has(id))
			.map(({ id }) => ({
				exerciseId: id,
				sets: []
			}));

		if (exercisesToAppend.length > 0) {
			append(exercisesToAppend);
		}
	}, [exercises, fields]);

	useEffect(() => {
		if (mode !== 'edit' || !routine) return;

		const routineExercises = routine.exercises.map((exercise) => ({
			id: exercise.exerciseId,
			title: exercise.title,
			video: exercise.video,
			primaryMuscleName: exercise.primaryMuscleName
		}));

		setExercises(routineExercises);
		setSelectedExerciseIds(routineExercises.map(({ id }) => id));
	}, []);

	useEffect(() => {
		if (mode === 'edit' && routine) {
			reset({
				title: routine.title,
				exercises: routine.exercises.map((ex) => ({
					exerciseId: ex.exerciseId,
					restTimer: ex.restTimer,
					sets: ex.sets.map((set) => ({
						...set,
						completed: false
					}))
				}))
			});
		}
	}, [routine]);

	useEffect(() => {
		return () => {
			clearRoutine();
		};
	}, []);

	return (
		<View className="flex-1 items-center p-6 gap-4">
			<FormInput
				required
				disabled={loadingRoutine}
				variant="line"
				autoCapitalize="words"
				control={control}
				name="title"
				placeholder="Enter Title Routine *"
			/>

			{!hasExercises() && (
				<View className="justify-center items-center gap-4 my-6">
					<BarbellIcon size={32} color={colors.foreground} />
					<Text>Get started by adding an exercise to your routine.</Text>
				</View>
			)}

			{fields.map((field, index) => {
				const exercise = exercises.find((item) => item.id === field.exerciseId);

				if (!exercise) return null;

				return (
					<ExerciseRoutineItem
						key={field.id}
						exercise={exercise}
						index={index}
						control={control}
						errors={errors}
						onRemove={() => handleRemoveExercise(index)}
					/>
				);
			})}

			<Button
				title="Add Exercise"
				variant="primary"
				onPress={() => {
					setSelectedExerciseIds(exercises.map(({ id }) => id));
					setIsSelecting(true);
					router.push('/routine/create/add-exercise');
				}}
				iconLeft={<PlusIcon />}
			/>

			{exercisesError && (
				<Text className="text-destructive">{exercisesError}</Text>
			)}

			{errors.root && <Text className="mt-2">{errors.root.message}</Text>}
		</View>
	);
};
