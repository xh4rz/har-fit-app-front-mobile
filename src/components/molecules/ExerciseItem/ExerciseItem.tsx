import { TouchableOpacity, View } from 'react-native';
import { Image, Text } from '@/components/atoms';
import { Exercise } from '@/infrastructure/interfaces';
import { useThemeColors, useThumbnail } from '@/hooks';
import { CaretRightIcon } from 'phosphor-react-native';

type ExerciseItemProps = {
	exercise: Exercise;
	onPress: () => void;
	isSelected?: boolean;
};

export const ExerciseItem = ({
	exercise,
	onPress,
	isSelected = false
}: ExerciseItemProps) => {
	const colors = useThemeColors();
	const thumbnail = useThumbnail(exercise.video);

	return (
		<TouchableOpacity
			onPress={onPress}
			className="flex flex-row gap-4 p-4 items-center"
		>
			{isSelected && <View className="w-2 h-full rounded-full bg-blue-500" />}
			<View className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
				<Image url={thumbnail} />
			</View>
			<View className="flex-1 ml-2">
				<Text>{exercise.title}</Text>
				<Text className="opacity-50">{exercise.primaryMuscle.name}</Text>
			</View>
			<View className="justify-center">
				<CaretRightIcon color={colors.primary} size={20} />
			</View>
		</TouchableOpacity>
	);
};
