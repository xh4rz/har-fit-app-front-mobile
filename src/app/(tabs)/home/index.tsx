import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Text } from '@/components/atoms';

export default function HomeScreen() {
	const { user } = useAuthStore();

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 p-4 gap-2">
				<Text className="text-lg text-muted-foreground">
					Hey, {user?.username}!
				</Text>
				<Text className="text-secondary text-4xl font-bold">
					{user?.fullname}
				</Text>
				<Text className="text-3xl font-bold">Your journey, your progress.</Text>
				<Text className="text-base text-muted-foreground mt-2">
					Track your workouts, celebrate your progress, and keep building a
					stronger you, one workout at a time.
				</Text>
			</View>
		</SafeAreaView>
	);
}
