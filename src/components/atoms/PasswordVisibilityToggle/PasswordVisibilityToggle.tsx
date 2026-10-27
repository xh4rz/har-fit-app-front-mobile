import { TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';

interface PasswordVisibilityToggleProps {
	visible: boolean;
	focused: boolean;
	hasError: boolean;
	disabled: boolean;
	onPress: () => void;
}

export const PasswordVisibilityToggle = ({
	visible,
	focused,
	hasError,
	disabled,
	onPress
}: PasswordVisibilityToggleProps) => {
	const colors = useThemeColors();

	const getIconColor = () => {
		if (disabled) return colors.mutedForeground;
		if (hasError) return colors.destructiveFocused;
		if (focused) return colors.ring;
		return colors.foreground;
	};

	const iconColor = getIconColor();

	return (
		<TouchableOpacity
			onPress={onPress}
			className="absolute right-1 top-0 bottom-0 w-11 items-center justify-center"
			disabled={disabled}
			accessibilityRole="button"
			accessibilityLabel={visible ? 'Hide password' : 'Show password'}
		>
			{visible ? (
				<EyeIcon size={20} color={iconColor} />
			) : (
				<EyeSlashIcon size={20} color={iconColor} />
			)}
		</TouchableOpacity>
	);
};
