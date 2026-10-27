import { Tabs, usePathname } from 'expo-router';
import { useThemeColors } from '@/hooks';
import { capitalize } from '@/utils';
import {
	BarbellIcon,
	HouseIcon,
	IdentificationCardIcon,
	UserIcon,
	type Icon
} from 'phosphor-react-native';

interface TabItem {
	name: string;
	Icon: Icon;
}

const tabs: TabItem[] = [
	{
		name: 'home',
		Icon: HouseIcon
	},
	{
		name: 'exercise',
		Icon: BarbellIcon
	},
	{
		name: 'routine',
		Icon: IdentificationCardIcon
	},
	{
		name: 'profile',
		Icon: UserIcon
	}
];

export default function TabsLayout() {
	const pathName = usePathname();

	const colors = useThemeColors();

	const hideTabs = ['/routine/create', '/routine/create/add-exercise'].includes(
		pathName
	);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				sceneStyle: { backgroundColor: colors.background },
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.foreground,
				animation: 'shift',
				tabBarStyle: {
					backgroundColor: colors.background,
					display: hideTabs ? 'none' : 'flex',
					borderTopWidth: 0,
					elevation: 0
				},
				popToTopOnBlur: true,
				tabBarHideOnKeyboard: true
			}}
			backBehavior="order"
		>
			{tabs.map(({ name, Icon }) => (
				<Tabs.Screen
					key={name}
					name={name}
					options={{
						title: capitalize(name),
						popToTopOnBlur: true,
						tabBarIcon: ({ color }) => <Icon size={24} color={String(color)} />
					}}
				/>
			))}
		</Tabs>
	);
}
