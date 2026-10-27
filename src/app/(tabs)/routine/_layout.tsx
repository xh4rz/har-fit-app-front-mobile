import { Stack, useFocusEffect } from 'expo-router';
import { useThemeColors } from '@/hooks';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';

export default function RoutineLayout() {
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
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Routine' }}
			/>
			<Stack.Screen
				name="create/index"
				options={{
					headerShown: true,
					title: 'Create Rutine'
				}}
			/>
			<Stack.Screen
				name="create/add-exercise/index"
				options={{
					headerShown: true,
					title: 'Select the exercise'
				}}
			/>
			<Stack.Screen
				name="edit/[id]"
				options={{
					headerShown: true,
					title: 'Edit Routine'
				}}
			/>
		</Stack>
	);
}
