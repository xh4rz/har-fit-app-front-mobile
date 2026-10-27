import { View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppBrand, Button, Text } from '@/components/atoms';

export default function WelcomeScreen() {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				paddingTop: insets.top + 20,
				paddingBottom: insets.bottom + 20
			}}
			className="flex-1 justify-center items-center p-4"
		>
			<View className="flex-1 items-center justify-center">
				<Text className="mb-2 text-3xl text-center">Welcome to</Text>
				<AppBrand className="mb-6" />
				<Text className="mb-10 max-w-xs text-center leading-6 text-muted-foreground">
					Your workouts, your progress, your best self.
				</Text>
			</View>
			<View className="w-full flex-row gap-4">
				<View className="flex-1">
					<Button
						title="Log In"
						size="lg"
						variant="primary"
						onPress={() => router.push('/auth/login')}
					/>
				</View>
				<View className="flex-1">
					<Button
						title="Sign Up"
						size="lg"
						variant="secondary"
						onPress={() => router.push('/auth/signup')}
					/>
				</View>
			</View>
		</View>
	);
}
