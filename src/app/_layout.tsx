import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack, usePathname, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { AppContextProvider } from '@/context/AppContext';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks';
import '../../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashView } from '@/screens/SplashView';
import { StorageAdapter } from '@/adapters/storage-adapter';
import { getUser } from '@/modules/auth/services/getUser';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
	const [isAppReady, setIsAppReady] = useState(false);

	useEffect(() => {
		const initAuth = async () => {
			const accessToken = await StorageAdapter.getItem('accessToken');

			try {
				if (!accessToken) return;

				const user = await getUser();

				useAuthStore.setState({
					isAuthenticated: true,
					user
				});
			} catch {
			} finally {
				SplashScreen.hideAsync();
			}
		};

		initAuth();
	}, []);

	if (!isAppReady) return <SplashView onFinish={() => setIsAppReady(true)} />;

	return (
		<AppContextProvider>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<BottomSheetModalProvider>
						<RootLayout />
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</AppContextProvider>
	);
}

function RootLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated } = useAuthStore();
	const theme = useThemeColors();

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
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.secondary,
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
					headerLeft: () => (
						<TouchableOpacity onPress={handleBack}>
							<Ionicons name="arrow-back" size={24} color={colors.secondary} />
						</TouchableOpacity>
					),
					contentStyle: {
						backgroundColor: theme.background
					}
				}}
			>
				<Stack.Protected guard={!isAuthenticated}>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen
						name="auth/login/index"
						options={{
							headerTitle: 'Login'
						}}
					/>
					<Stack.Screen
						name="auth/signup/index"
						options={{ headerTitle: 'Signup' }}
					/>
				</Stack.Protected>

				<Stack.Protected guard={isAuthenticated}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack.Protected>
			</Stack>
		</React.Fragment>
	);
}
