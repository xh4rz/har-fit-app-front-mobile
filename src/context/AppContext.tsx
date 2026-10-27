import React, { ReactNode, useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
	KeyboardContextProvider,
	ReactQueryContextProvider,
	ThemeContextProvider
} from './';
import { SecureStorageAdapter } from '@/infrastructure/adapters';
import { getUser } from '@/modules/auth/services/getUser';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { SplashView } from '@/components/screens';

interface AppContextProps {
	children: ReactNode;
}

SplashScreen.preventAutoHideAsync();

export function AppContextProvider({ children }: AppContextProps) {
	const [isAppReady, setIsAppReady] = useState(false);

	// useEffect(() => {
	// 	const initAuth = async () => {
	// 		const accessToken = await SecureStorageAdapter.getItem('accessToken');

	// 		try {
	// 			if (!accessToken) return;

	// 			const user = await getUser();

	// 			useAuthStore.setState({
	// 				isAuthenticated: true,
	// 				user
	// 			});
	// 		} catch {
	// 		} finally {
	// 			SplashScreen.hideAsync();
	// 		}
	// 	};

	// 	initAuth();
	// }, []);

	return (
		<KeyboardContextProvider>
			<ReactQueryContextProvider>
				<ThemeContextProvider>
					{!isAppReady ? (
						<SplashView onFinish={() => setIsAppReady(true)} />
					) : (
						<SafeAreaProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<BottomSheetModalProvider>{children}</BottomSheetModalProvider>
							</GestureHandlerRootView>
						</SafeAreaProvider>
					)}
				</ThemeContextProvider>
			</ReactQueryContextProvider>
		</KeyboardContextProvider>
	);
}
