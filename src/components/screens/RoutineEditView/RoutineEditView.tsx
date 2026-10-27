import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardScrollViewLayout } from '@/components/templates';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/atoms';
import { RoutineForm } from '@/components/organisms';
import { getRoutineById } from '@/modules/routine/services';
import { LoadingView } from '@/components/molecules';

export const RoutineEditView = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const { data: routine, isPending } = useQuery({
		queryKey: ['routine', id],
		queryFn: () => getRoutineById(id)
	});

	if (!routine) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>An error occurred edit routine</Text>
			</View>
		);
	}

	if (isPending) {
		return <LoadingView titleLoading="routine" />;
	}

	return (
		<KeyboardScrollViewLayout>
			<RoutineForm mode="edit" routine={routine} />
		</KeyboardScrollViewLayout>
	);
};
