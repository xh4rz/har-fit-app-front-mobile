import '../../global.css';
import React from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { AppContextProvider } from '@/context/AppContext';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { BackButton } from '@/components/atoms';
import { useThemeColors } from '@/hooks';

export default function AppLayout() {
	return (
		<AppContextProvider>
			<AuthLayout />
		</AppContextProvider>
	);
}

function AuthLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated } = useAuthStore();
	const colors = useThemeColors();

	console.log({ pathname });

	const handleBack = () => {
		if (pathname === '/auth/login') {
			router.dismissTo('/');
		} else {
			router.back();
		}
	};

	return (
		<React.Fragment>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: colors.background },
					headerTintColor: colors.primary,
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					animation: 'slide_from_right',
					headerLeft: () => <BackButton onPress={handleBack} />,
					contentStyle: {
						backgroundColor: colors.background
					}
				}}
			>
				<Stack.Protected guard={!isAuthenticated}>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen
						name="auth/login/index"
						options={{
							headerTitle: ''
						}}
					/>
					<Stack.Screen
						name="auth/signup/index"
						options={{ headerTitle: '' }}
					/>
				</Stack.Protected>
				<Stack.Protected guard={isAuthenticated}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack.Protected>
			</Stack>
		</React.Fragment>
	);
}
