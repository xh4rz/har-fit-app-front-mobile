import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { View } from 'react-native';
import { BarbellIcon, PlusIcon } from 'phosphor-react-native';
import { Button, Text } from '@/components/atoms';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';
import { ExerciseRoutineItem, FormInput } from '@/components/molecules';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	RoutineFormData,
	routineFormSchema
} from '@/modules/routine/validation/routineFormSchema';
import { patchRoutineById, postRoutine } from '@/modules/routine/services';
import { setFormError } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { RoutineResponse } from '@/infrastructure/interfaces';

interface RoutineFormProps {
	mode: 'create' | 'edit';
	routine?: RoutineResponse;
}

export const RoutineForm = ({ mode, routine }: RoutineFormProps) => {
	const router = useRouter();

	const navigation = useNavigation();

	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);

	const hasExercises = useRoutineStore((state) => state.hasExercises);
	const exercises = useRoutineStore((state) => state.exercises);
	const setIsSelecting = useRoutineStore((state) => state.setIsSelecting);
	const clearRoutine = useRoutineStore((state) => state.clearRoutine);

	const getDefaultValues = (): RoutineFormData => {
		if (mode === 'edit' && routine) {
			return {
				title: routine.title,
				exercises: routine.exercises.map((ex) => ({
					exerciseId: ex.exerciseId,
					sets: ex.sets
				}))
			};
		}

		return {
			title: '',
			exercises: []
		};
	};

	const {
		control,
		handleSubmit,
		setError,

		formState: { errors }
	} = useForm<RoutineFormData>({
		resolver: zodResolver(routineFormSchema),
		mode: 'onChange',
		defaultValues: getDefaultValues()
	});

	const { fields, replace } = useFieldArray({
		control,
		name: 'exercises'
	});

	const onSaveRoutine = async (data: RoutineFormData) => {
		setLoading(true);
		try {
			if (mode === 'create') {
				await postRoutine(data);
			} else {
				const routineId = routine?.id;

				if (!routineId) {
					setError('root', { message: 'Invalid routine id' });
					return;
				}
				await patchRoutineById(routineId, data);
				await queryClient.invalidateQueries({
					queryKey: ['routine', routineId]
				});
			}

			await queryClient.invalidateQueries({
				queryKey: ['routines']
			});

			router.dismiss();
		} catch (error) {
			setFormError(setError, error);
		} finally {
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					title={mode === 'create' ? 'Save' : 'Update'}
					variant="secondary"
					fullWidth={false}
					disabled={!hasExercises()}
					className="text-secondary font-bold"
					onPress={handleSubmit(onSaveRoutine)}
					loading={loading}
				/>
			)
		});
	}, []);

	useEffect(() => {
		if (exercises.length === 0) return;

		const formExercises = exercises.map((exercise) => {
			const existing = fields.find((f) => f.exerciseId === exercise.id);

			return {
				exerciseId: exercise.id,
				sets: existing?.sets || []
			};
		});

		replace(formExercises);
	}, [exercises]);

	useEffect(() => {
		if (mode !== 'edit' || !routine) return;

		const routineExercises = routine.exercises.map((ex) => ({
			id: ex.exerciseId,
			title: ex.title,
			video: ex.video,
			primaryMuscleName: ex.primaryMuscleName
		}));

		if (exercises.length === 0) {
			useRoutineStore.getState().setExercises(routineExercises);
			useRoutineStore.getState().setSelectedExercises(routineExercises);
		}
	}, []);

	useFocusEffect(() => {
		const { selectedExercises, exercises } = useRoutineStore.getState();

		if (selectedExercises.length !== exercises.length) {
			useRoutineStore.setState({
				selectedExercises: exercises
			});
		}
	});

	useEffect(() => {
		return () => {
			clearRoutine();
		};
	}, []);

	return (
		<View className="flex-1 items-center p-5 gap-4">
			<FormInput
				required
				autoCapitalize="words"
				control={control}
				name="title"
				placeholder="Enter Routine Title *"
				variant="line"
			/>

			{!hasExercises() && (
				<View className="justify-center items-center gap-4">
					<BarbellIcon size={32} color="white" />
					<Text>Get started by adding an exercise to your routine.</Text>
				</View>
			)}

			{fields.map((field, index) => {
				const exercise = exercises.find((ex) => ex.id === field.exerciseId);

				if (!exercise) return null;

				return (
					<ExerciseRoutineItem
						key={field.id}
						exercise={exercise}
						index={index}
						control={control}
						errors={errors}
					/>
				);
			})}

			<Button
				title="Add Exercise"
				variant="secondary"
				onPress={() => {
					setIsSelecting(true);
					router.push('/routine/create/add-exercise');
				}}
				iconLeft={<PlusIcon />}
			/>

			{errors.root && (
				<Text className="text-red-500 mt-2">{errors.root.message}</Text>
			)}
		</View>
	);
};
