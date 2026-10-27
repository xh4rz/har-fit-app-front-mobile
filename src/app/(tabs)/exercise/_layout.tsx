import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Button } from '@/components/atoms';
import { useThemeColors } from '@/hooks';

export default function ExerciseLayout() {
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
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerShown: true,
					title: 'Exercises',
					headerRight: () => (
						<View>
							<Button
								title="Create"
								variant="primary"
								fullWidth={false}
								onPress={() =>
									router.push({
										pathname: '/exercise/create'
									})
								}
							/>
						</View>
					)
				}}
			/>
			<Stack.Screen
				name="create/index"
				options={{
					headerShown: true,
					title: 'Create Exercise'
				}}
			/>
			<Stack.Screen
				name="edit/[id]"
				options={{
					headerShown: true,
					title: 'Edit Exercise'
				}}
			/>
		</Stack>
	);
}
