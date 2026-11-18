import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getRoutineById } from '@/modules/routine/services';
import { KeyboardScrollViewLayout } from '@/components/templates';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/atoms';
import { RoutineForm } from '@/components/organisms';
import { LoadingView } from '@/components/molecules';

export const RoutineEditView = () => {
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

	return (
		<KeyboardScrollViewLayout>
			<RoutineForm mode="edit" routine={dataRoutine} />
		</KeyboardScrollViewLayout>
	);
};
