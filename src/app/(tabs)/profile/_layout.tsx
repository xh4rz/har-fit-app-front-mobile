import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
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
				headerRight: () => (
					<TouchableOpacity
						onPress={() => router.navigate('/profile/settings')}
					>
						<GearIcon size={24} color={colors.primary} />
					</TouchableOpacity>
				),
				contentStyle: {
					backgroundColor: colors.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Profile' }}
			/>
			<Stack.Screen
				name="settings/index"
				options={{
					headerShown: true,
					title: 'Settings',
					headerRight: () => null
				}}
			/>
			<Stack.Screen
				name="settings/theme"
				options={{
					headerShown: true,
					title: 'Theme',
					headerRight: () => null
				}}
			/>
		</Stack>
	);
}
