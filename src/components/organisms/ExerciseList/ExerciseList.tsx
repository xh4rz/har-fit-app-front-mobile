import { FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Exercise } from '@/infrastructure/interfaces';
import { Button, Separator, Text } from '@/components/atoms';
import { ExerciseItem } from '@/components/molecules';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';

type ExerciseListProps = {
	data: Exercise[] | undefined;
	onPress: (id: string, title: string) => void;
	selectable?: boolean;
};

export const ExerciseList = ({
	data,
	onPress,
	selectable = false
}: ExerciseListProps) => {
	const router = useRouter();
	const setExercises = useRoutineStore((state) => state.setExercises);
	const selectedExerciseIds = useRoutineStore(
		(state) => state.selectedExerciseIds
	);
	const toggleExercise = useRoutineStore((state) => state.toggleExercise);
	const isSelected = useRoutineStore((state) => state.isSelected);

	const handlePress = (item: Exercise) => {
		if (selectable) {
			toggleExercise(item.id);
			return;
		} else {
			onPress(item.id, item.title);
		}
	};

	const handleConfirmSelection = () => {
		const selectedExercises = (data ?? [])
			.filter((exercise) => selectedExerciseIds.includes(exercise.id))
			.map((exercise) => ({
				id: exercise.id,
				title: exercise.title,
				video: exercise.video,
				primaryMuscleName: exercise.primaryMuscle.name
			}));

		setExercises(selectedExercises);
		router.dismiss();
	};

	return (
		<View>
			<FlatList
				className="h-[90%]"
				data={data}
				renderItem={({ item }) => (
					<ExerciseItem
						exercise={item}
						isSelected={selectable ? isSelected(item.id) : false}
						onPress={() => handlePress(item)}
					/>
				)}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={Separator}
				ListEmptyComponent={
					<View className="flex-1 items-center justify-center">
						<Text className="text-center">No exercises available</Text>
					</View>
				}
				// contentContainerStyle={{
				// 	flexGrow: 1,
				// 	flex: 1,
				// 	height: 200,
				// 	paddingBottom: 80
				// }}
			/>

			{selectable && selectedExerciseIds.length > 0 && (
				<View className="absolute bottom-4 left-0 right-0">
					<Button
						title={`Add Exercises (${selectedExerciseIds.length})`}
						onPress={handleConfirmSelection}
					/>
				</View>
			)}
		</View>
	);
};
