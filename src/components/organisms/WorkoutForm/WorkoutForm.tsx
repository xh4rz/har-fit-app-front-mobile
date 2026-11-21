'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useThemeColors, useTimer } from '@/hooks';
import {
	RoutineFormInput,
	RoutineFormOutput,
	workoutFormSchema
} from '@/modules/routine/validation/routineFormSchema';
import { useWorkoutStore } from '@/modules/workout/store/useWorkoutStore';
import { patchWorkoutById, postWorkout } from '@/modules/workout/services';
import { Button, IconButton, Separator, Text } from '@/components/atoms';
import {
	ExerciseRoutineItem,
	FormInput,
	WorkoutStats,
	DeleteModal
} from '@/components/molecules';
import { formatDuration, setFormError } from '@/utils';
import { FloppyDiskIcon, TrashIcon } from 'phosphor-react-native';
import {
	type ApiError,
	type RoutineResponse,
	type WorkoutResponse
} from '@/infrastructure/interfaces';

type WorkoutFormProps =
	| { mode: 'create'; routine: RoutineResponse }
	| { mode: 'edit'; routine: WorkoutResponse };

export const WorkoutForm = ({ mode, routine }: WorkoutFormProps) => {
	const router = useRouter();
	const colors = useThemeColors();
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const sourceId = routine.id;
	const isModeCreate = mode === 'create';
	const isModeEdit = mode === 'edit';
	const [showModalDeleteWorkout, setShowModalDeleteWorkout] = useState(false);
	const workout = useWorkoutStore((state) => state.workout);
	const startedAt = useWorkoutStore((state) => state.startedAt);
	const setWorkout = useWorkoutStore((state) => state.setWorkout);
	const startWorkout = useWorkoutStore((state) => state.startWorkout);
	const clearWorkout = useWorkoutStore((state) => state.clearWorkout);
	const { formattedTime, elapsedSeconds } = useTimer(
		isModeCreate ? startedAt : null
	);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		reset,
		formState: { isDirty, errors }
	} = useForm<RoutineFormInput, FieldValues, RoutineFormOutput>({
		resolver: zodResolver(workoutFormSchema),
		mode: 'onSubmit',
		defaultValues: {
			title: '',
			description: '',
			exercises: []
		}
	});

	const formExercises = useWatch({
		control,
		name: 'exercises'
	});

	const { fields } = useFieldArray({
		control,
		name: 'exercises'
	});

	const workoutVolume = (formExercises ?? []).reduce(
		(total, exercise) =>
			total +
			(exercise.sets ?? []).reduce(
				(exerciseTotal, set) =>
					set.completed
						? exerciseTotal + Number(set.kg) * Number(set.reps)
						: exerciseTotal,
				0
			),
		0
	);

	const workoutSets = formExercises?.reduce(
		(total, exercise) =>
			total + (exercise.sets ?? []).filter((set) => set.completed).length,
		0
	);

	const displayedDuration = isModeEdit
		? formatDuration(routine.duration)
		: formattedTime;

	const onSaveWorkout = (data: RoutineFormOutput) => {
		if (workoutSets === 0) {
			setError('root', {
				message: 'Check at least one set.'
			});
			return;
		}
		clearErrors('root');
		saveWorkout(data);
	};

	const onDeleteWorkout = () => {
		clearWorkout();
		setShowModalDeleteWorkout(false);
		router.replace('/routine');
	};

	const { mutate: saveWorkout, isPending: loadingWorkout } = useMutation({
		mutationFn: async (data: RoutineFormOutput) => {
			const dataWorkout = {
				...data,
				duration: isModeCreate ? elapsedSeconds : routine.duration
			};
			if (isModeCreate) {
				return postWorkout(dataWorkout);
			} else {
				if (sourceId) {
					return patchWorkoutById(sourceId, dataWorkout);
				}
			}
		},
		onSuccess: async (workout) => {
			if (!workout) return;

			await queryClient.invalidateQueries({ queryKey: ['workouts'] });

			if (isModeCreate) {
				clearWorkout();
				router.replace({
					pathname: '/workout/success',
					params: { workout: JSON.stringify(workout) }
				});
			} else {
				await queryClient.invalidateQueries({
					queryKey: ['workout', sourceId]
				});
				router.replace('/profile');
			}
		},
		onError: (error: ApiError) => {
			const errorObj = error;
			setFormError(setError, errorObj);
		}
	});

	useEffect(() => {
		if (!routine) return;

		if (isModeCreate && workout) {
			reset(workout);
			return;
		}

		const initialWorkout: RoutineFormInput = {
			title: routine.title,
			description: isModeEdit ? (routine.description ?? '') : '',
			exercises: routine.exercises.map((exercise) => ({
				exerciseId: exercise.exerciseId,
				restTimer: exercise.restTimer,
				sets: exercise.sets.map((set) => ({
					...set,
					completed: set.completed ?? false
				}))
			}))
		};

		if (isModeEdit) {
			reset(initialWorkout);
			return;
		}

		setWorkout(sourceId, initialWorkout);
		reset(initialWorkout);
		startWorkout();
	}, [routine]);

	useEffect(() => {
		if (!isDirty) return;

		setWorkout(sourceId, {
			...workout,
			exercises: formExercises ?? []
		} as RoutineFormInput);
	}, [formExercises]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					onPress={handleSubmit(onSaveWorkout)}
					loading={loadingWorkout}
				>
					<FloppyDiskIcon color={colors.primary} />
				</IconButton>
			)
		});
	}, [loadingWorkout, workoutSets]);

	return (
		<View className="flex-1 items-center p-6 gap-4">
			<WorkoutStats
				duration={displayedDuration}
				volume={workoutVolume}
				sets={workoutSets}
			/>

			<Separator />

			{errors.root && (
				<Text className="text-destructive">{errors.root.message}</Text>
			)}

			<FormInput
				required
				disabled={loadingWorkout}
				control={control}
				name="title"
				label="Title Workout"
				placeholder="Enter Title Workout"
			/>

			<FormInput
				disabled={loadingWorkout}
				control={control}
				name="description"
				label="Description"
				placeholder="How did your workout go? Leave some notes here..."
				textAlignVertical="top"
				inputClassName="resize-none min-h-24"
				multiline
				numberOfLines={5}
			/>

			{fields.map((field, index) => {
				const exercise = routine?.exercises.find(
					(ex) => ex.exerciseId === field.exerciseId
				);

				if (!exercise) return null;

				return (
					<ExerciseRoutineItem
						key={field.id}
						exercise={{
							...exercise,
							id: exercise.exerciseId
						}}
						index={index}
						control={control}
						errors={errors}
						isWorkout={true}
					/>
				);
			})}

			{isModeCreate && (
				<Button
					title="Discard Workout"
					variant="destructive"
					iconLeft={<TrashIcon />}
					onPress={() => setShowModalDeleteWorkout(true)}
				/>
			)}

			<DeleteModal
				title={`Discard '${routine.title}' Workout`}
				description="Are you sure you want to discard this workout?"
				confirmLabel="Discard"
				visible={showModalDeleteWorkout}
				setVisible={setShowModalDeleteWorkout}
				onDelete={onDeleteWorkout}
			/>
		</View>
	);
};
