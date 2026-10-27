import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardScrollViewLayout } from '@/components/templates';
import { getExerciseById } from '@/modules/exercise/services/exercise';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Exercise } from '@/infrastructure/interfaces';
import { Text } from '@/components/atoms';
import { ExerciseForm } from '@/components/organisms';
import { ExerciseFormData } from '@/modules/exercise/validation/exerciseFormSchema';

export const ExerciseEditView = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const queryClient = useQueryClient();

	const cachedExercise = queryClient.getQueryData<Exercise>(['exercises', id]);

	const { data: exercise } = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => getExerciseById(id),
		initialData: cachedExercise
	});

	const mapExerciseToForm = (exercise: Exercise): ExerciseFormData => ({
		title: exercise.title,
		equipmentId: exercise.equipment?.id ?? 0,
		primaryMuscleId: exercise.primaryMuscle?.id ?? 0,
		secondaryMuscleIds: exercise.secondaryMuscles?.map((i) => i.id) ?? [],
		instruction: exercise.instruction?.map((text: string) => ({ text })) ?? [],
		file: {
			uri: exercise.video,
			fileName: 'video.mp4',
			mimeType: 'video/mp4',
			width: 0,
			height: 0
		}
	});

	if (!exercise) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>An error occurred edit exercise details..</Text>
			</View>
		);
	}

	return (
		<KeyboardScrollViewLayout>
			<ExerciseForm mode="edit" defaultValues={mapExerciseToForm(exercise)} />
		</KeyboardScrollViewLayout>
	);
};
