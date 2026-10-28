import { Stack, useRouter } from 'expo-router';
import { useThemeColors } from '@/hooks';
import { BackButton, IconButton } from '@/components/atoms';
import { GearIcon } from 'phosphor-react-native';

export default function ProfileLayout() {
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
				headerLeft: () => <BackButton onPress={() => router.back()} />,
				headerRight: () => (
					<IconButton onPress={() => router.navigate('/profile/settings')}>
						<GearIcon size={24} color={colors.primary} />
					</IconButton>
				)
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'Profile',
					headerLeft: () => null
				}}
			/>
			<Stack.Screen
				name="settings/index"
				options={{
					title: 'Settings',
					headerRight: () => null
				}}
			/>
			<Stack.Screen
				name="settings/theme"
				options={{
					title: 'Theme',
					headerRight: () => null
				}}
			/>
		</Stack>
	);
}
