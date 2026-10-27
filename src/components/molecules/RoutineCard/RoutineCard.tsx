import React from 'react';
import { RoutineResponse } from '@/infrastructure/interfaces';
import { View } from 'react-native';
import { Button, IconButton, Text } from '@/components/atoms';
import { DotsThreeIcon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

interface RoutineCardProps {
	routine: RoutineResponse;
	onOptionsPress: (id: string) => void;
}

export const RoutineCard = ({ routine, onOptionsPress }: RoutineCardProps) => {
	const colors = useThemeColors();

	return (
		<View key={routine.id} className="bg-zinc-800 p-4 rounded-lg">
			<View className="flex flex-row items-center">
				<Text className="flex-1 font-bold">{routine.title}</Text>
				<IconButton
					className="bg-transparent"
					icon={<DotsThreeIcon color={colors.primary} />}
					onPress={() => onOptionsPress(routine.id)}
				/>
			</View>
			<Text className="text-white/40 mb-2">
				{routine.exercises.map((e) => e.title).join(', ')}
			</Text>
			<Button title="Start Routine" variant="secondary" size="sm" />
		</View>
	);
};
