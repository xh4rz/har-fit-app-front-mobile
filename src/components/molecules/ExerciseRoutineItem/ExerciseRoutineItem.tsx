import { View } from 'react-native';
import { Control, FieldErrors } from 'react-hook-form';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';
import { ExerciseSummaryItem } from '../ExerciseSummaryItem';
import { ExerciseRoutineSets } from '../ExerciseRoutineSets';
import type { RoutineExercise } from '@/infrastructure/interfaces/routine/routineExercise';

interface ExerciseRoutineItemProps {
	exercise: RoutineExercise;
	index: number;
	control: Control<RoutineFormInput>;
	errors: FieldErrors<RoutineFormInput>;
	isWorkout?: boolean;
	onRemove?: () => void;
}

export const ExerciseRoutineItem = ({
	exercise,
	index,
	control,
	errors,
	isWorkout = false,
	onRemove
}: ExerciseRoutineItemProps) => {
	return (
		<View className="w-full gap-2">
			<ExerciseSummaryItem
				exerciseId={exercise.id}
				title={exercise.title ?? ''}
				video={exercise.video}
				description={exercise.primaryMuscleName}
				onRemove={!isWorkout ? onRemove : undefined}
				className="mb-2"
			/>

			<ExerciseRoutineSets
				control={control}
				exerciseIndex={index}
				error={errors.exercises}
				isWorkout={isWorkout}
			/>
		</View>
	);
};
