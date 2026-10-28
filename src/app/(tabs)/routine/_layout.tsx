import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useThemeColors } from '@/hooks';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';
import { BackButton } from '@/components/atoms';

export default function RoutineLayout() {
	const router = useRouter();

	const colors = useThemeColors();

	const clearRoutine = useRoutineStore((state) => state.clearRoutine);

	useFocusEffect(() => {
		return () => {
			clearRoutine();
		};
	});

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.background },
				headerTintColor: colors.primary,
				headerTitleAlign: 'center',
				headerTitleStyle: { color: colors.secondary },
				headerShadowVisible: false,
				animation: 'slide_from_left',
				contentStyle: {
					backgroundColor: colors.background
				},
				headerLeft: () => <BackButton onPress={() => router.back()} />
			}}
		>
			<Stack.Screen
				name="index"
				options={{ title: 'Routine', headerLeft: () => null }}
			/>
			<Stack.Screen
				name="create/index"
				options={{
					title: 'Create Rutine'
				}}
			/>
			<Stack.Screen
				name="create/add-exercise/index"
				options={{
					title: 'Select the exercise'
				}}
			/>
			<Stack.Screen
				name="edit/[id]"
				options={{
					title: 'Edit Routine'
				}}
			/>
		</Stack>
	);
}
