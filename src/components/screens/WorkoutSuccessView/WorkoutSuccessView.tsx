import { useMemo, useRef } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { usePreventRemove } from '@react-navigation/core';
import { ScrollView, View } from 'react-native';
import { Button, Card, Separator, Text } from '@/components/atoms';
import { WorkoutStats } from '@/components/molecules';
import { WorkoutResponse } from '@/infrastructure/interfaces';
import { formatDuration } from '@/utils';

export const WorkoutSuccessView = () => {
	const router = useRouter();
	const { workout: workoutParam } = useLocalSearchParams<{
		workout?: string | string[];
	}>();
	const navigation = useNavigation();
	const canLeave = useRef(false);

	const workout = useMemo(() => {
		const serializedWorkout = Array.isArray(workoutParam)
			? workoutParam[0]
			: workoutParam;

		if (!serializedWorkout) return null;

		try {
			return JSON.parse(serializedWorkout) as WorkoutResponse;
		} catch {
			return null;
		}
	}, [workoutParam]);

	usePreventRemove(true, ({ data }) => {
		if (canLeave.current) {
			navigation.dispatch(data.action);
		}
	});

	const handleDone = () => {
		canLeave.current = true;
		router.replace('/profile');
	};

	return (
		<ScrollView
			className="flex-1"
			contentContainerStyle={{ flexGrow: 1, gap: 24, padding: 24 }}
			showsVerticalScrollIndicator={false}
		>
			<View className="flex-1 gap-6">
				<View className="items-center gap-2">
					<Text className="text-center text-3xl font-bold text-secondary">
						Workout saved!
					</Text>
					<Text className="text-center text-muted-foreground">
						Great work. Here&apos;s your workout summary.
					</Text>
				</View>

				{workout && (
					<>
						<Card className="gap-4">
							<Text className="text-xl font-semibold">{workout.title}</Text>
							<WorkoutStats
								duration={formatDuration(workout.duration)}
								volume={workout.volume}
								sets={workout.sets}
							/>
						</Card>

						<View className="gap-3">
							<Text className="font-semibold text-secondary">Exercises</Text>
							{workout.exercises.map((exercise, index) => (
								<View key={`${exercise.exerciseId}-${index}`}>
									<Text>{exercise.title}</Text>
									{index < workout.exercises.length - 1 && <Separator />}
								</View>
							))}
						</View>
					</>
				)}
			</View>

			<Button title="Done" onPress={handleDone} />
		</ScrollView>
	);
};
