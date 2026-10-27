import { TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { ArrowLeftIcon } from 'phosphor-react-native';

interface BackButtonProps {
	onPress: () => void;
}

export const BackButton = ({ onPress }: BackButtonProps) => {
	const colors = useThemeColors();

	return (
		<TouchableOpacity onPress={onPress}>
			<ArrowLeftIcon size={24} color={colors.secondary} />
		</TouchableOpacity>
	);
};
