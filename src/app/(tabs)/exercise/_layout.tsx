import { Stack, useRouter } from 'expo-router';
import { BackButton, IconButton } from '@/components/atoms';
import { useThemeColors } from '@/hooks';
import { PlusIcon } from 'phosphor-react-native';

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
				},
				headerLeft: () => <BackButton onPress={() => router.back()} />
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'Exercises',
					headerLeft: () => null,
					headerRight: () => (
						<IconButton onPress={() => router.navigate('/exercise/create')}>
							<PlusIcon color={colors.primary} />
						</IconButton>
					)
				}}
			/>
			<Stack.Screen
				name="create/index"
				options={{
					title: 'Create Exercise'
				}}
			/>
			<Stack.Screen
				name="edit/[id]"
				options={{
					title: 'Edit Exercise'
				}}
			/>
		</Stack>
	);
}
