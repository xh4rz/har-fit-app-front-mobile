'use client';

import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getRoutineById } from '@/modules/routine/services';
import { Text } from '@/components/atoms';
import { LoadingView } from '@/components/molecules';
import { WorkoutForm } from '@/components/organisms';

export const WorkoutView = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const {
		data: dataRoutine,
		isPending: isPendingRoutine,
		isError: isErrorRoutine
	} = useQuery({
		queryKey: ['routine', id],
		queryFn: () => getRoutineById(id)
	});

	if (isPendingRoutine) {
		return <LoadingView titleLoading="routine" />;
	}

	if (isErrorRoutine) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>An error occurred while loading the routine.</Text>
			</View>
		);
	}

	return <WorkoutForm mode="create" routine={dataRoutine} />;
};
