import { Stack, useRouter } from 'expo-router';
import { BackButton } from '@/components/atoms';
import { useThemeColors } from '@/hooks';

export default function WorkoutLayout() {
	const router = useRouter();
	const colors = useThemeColors();

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
				headerLeft: () => (
					<BackButton onPress={() => router.replace('/routine')} />
				)
			}}
		>
			<Stack.Screen name="[id]" options={{ title: 'Create Workout' }} />
			<Stack.Screen
				name="success"
				options={{
					headerShown: false
				}}
			/>
		</Stack>
	);
}
