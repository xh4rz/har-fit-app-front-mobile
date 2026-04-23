import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import { BarbellIcon, HouseIcon, UserIcon } from 'phosphor-react-native';

export default function TabsLayout() {
	const pathName = usePathname();

	const hideTabs = ['/routine/create', '/routine/create/add-exercise'].includes(
		pathName
	);

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: 'white',
				tabBarActiveBackgroundColor: colors.secondary,
				animation: 'none',
				tabBarStyle: {
					backgroundColor: colors.secondary,
					display: hideTabs ? 'none' : 'flex'
				},
				popToTopOnBlur: true,
				tabBarHideOnKeyboard: true
			}}
			backBehavior="order"
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<HouseIcon size={24} color={focused ? colors.primary : 'white'} />
					)
				}}
			/>

			<Tabs.Screen
				name="exercise"
				options={{
					title: 'Exercise',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<BarbellIcon size={24} color={focused ? colors.primary : 'white'} />
					)
				}}
			/>

			<Tabs.Screen
				name="routine"
				options={{
					title: 'Routine',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="fitness-center"
							size={24}
							color={focused ? colors.primary : 'white'}
						/>
					)
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<UserIcon size={24} color={focused ? colors.primary : 'white'} />
					)
				}}
			/>
		</Tabs>
	);
}
