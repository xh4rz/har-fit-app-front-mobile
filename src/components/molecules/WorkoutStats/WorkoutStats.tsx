import { View } from 'react-native';
import { Text } from '@/components/atoms';

interface WorkoutStatsProps {
	duration: string;
	volume: number;
	sets: number;
}

export const WorkoutStats = ({ duration, volume, sets }: WorkoutStatsProps) => {
	return (
		<View className="w-full flex-row justify-between">
			<View className="min-w-20 gap-1">
				<Text className="text-foreground">Duration</Text>
				<Text className=" text-primary tabular-nums">{duration}</Text>
			</View>
			<View className="min-w-20 gap-1">
				<Text className="text-foreground">Volume</Text>
				<Text className="text-primary">{volume} kg</Text>
			</View>
			<View className="min-w-20 gap-1">
				<Text className="text-foreground">Sets</Text>
				<Text className="text-primary">{sets}</Text>
			</View>
		</View>
	);
};
