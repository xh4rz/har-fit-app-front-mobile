import React, { createContext, useEffect, ReactNode, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { themes } from '@/theme';
import { AsyncStorageAdapter } from '@/infrastructure/adapters';

export type ThemeName = 'light' | 'dark' | 'system';

interface ThemeContextType {
	theme: 'light' | 'dark';
	selectedTheme: ThemeName;
	setTheme: (theme: ThemeName) => void;
}

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'dark',
	selectedTheme: 'system',
	setTheme: () => {}
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const { colorScheme, setColorScheme } = useColorScheme();

	const [selectedTheme, setSelectedTheme] = useState<ThemeName>('system');

	const theme =
		selectedTheme === 'system' ? (colorScheme ?? 'dark') : selectedTheme;

	useEffect(() => {
		loadSavedTheme();
	}, []);

	const loadSavedTheme = async () => {
		try {
			const savedTheme = await AsyncStorageAdapter.getItem(THEME_STORAGE_KEY);

			if (
				savedTheme === 'light' ||
				savedTheme === 'dark' ||
				savedTheme === 'system'
			) {
				setSelectedTheme(savedTheme);
				setColorScheme(savedTheme);
			} else {
				setSelectedTheme('system');
				setColorScheme('system');
			}
		} catch (error) {
			console.error('Error loading theme:', error);
			setSelectedTheme('system');
			setColorScheme('system');
		}
	};

	const setTheme = async (newTheme: ThemeName) => {
		try {
			await AsyncStorageAdapter.setItem(THEME_STORAGE_KEY, newTheme);
			setSelectedTheme(newTheme);
			setColorScheme(newTheme);
		} catch (error) {
			console.error('Error saving theme:', error);
		}
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				selectedTheme,
				setTheme
			}}
		>
			<StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
			<View className="flex-1" style={themes[theme]}>
				{children}
			</View>
		</ThemeContext.Provider>
	);
};
