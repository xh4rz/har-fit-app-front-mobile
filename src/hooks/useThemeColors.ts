import { useContext } from 'react';
import { ThemeContext } from '@/context';
import { colors } from '@/constants/colors';

export const useThemeColors = () => {
	const { theme } = useContext(ThemeContext);
	return {
		...colors[theme],
		primary: colors.primary,
		secondary: colors.secondary
	};
};
