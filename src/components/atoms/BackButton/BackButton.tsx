import { useThemeColors } from '@/hooks';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { IconButton } from '../IconButton';

interface BackButtonProps {
	onPress: () => void;
}

export const BackButton = ({ onPress }: BackButtonProps) => {
	const colors = useThemeColors();

	return (
		<IconButton onPress={onPress}>
			<ArrowLeftIcon size={24} color={colors.primary} />
		</IconButton>
	);
};
