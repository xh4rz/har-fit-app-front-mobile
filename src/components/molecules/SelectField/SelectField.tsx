import { TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '@/hooks';
import { Text } from '@/components/atoms';
import { CaretRightIcon } from 'phosphor-react-native';

type SelectFieldProps = {
	label: string;
	value: string;
	error?: string;
	required?: boolean;
	onPress: () => void;
};

export const SelectField = ({
	label,
	value,
	error,
	required,
	onPress
}: SelectFieldProps) => {
	const colors = useThemeColors();
	return (
		<TouchableOpacity
			className="flex flex-row items-center p-2 rounded-md"
			onPress={onPress}
		>
			<View className="flex-1">
				<Text>
					{label} <Text className="text-secondary">{required && '*'}</Text>
				</Text>

				<Text
					className={`text-sm ${error ? 'text-destructive' : 'text-muted-foreground'}`}
				>
					{error || value}
				</Text>
			</View>

			<CaretRightIcon size={20} color={colors.primary} />
		</TouchableOpacity>
	);
};
