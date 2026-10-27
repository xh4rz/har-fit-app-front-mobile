import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Checkbox, Image, Text } from '@/components/atoms';
import { useThemeColors } from '@/hooks';
import { CheckIcon } from 'phosphor-react-native';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type SelectListItemProps<T extends BaseSelectItem> = {
	item: T;
	selectedIds: number[];
	onPress: (id: number) => void;
	multiple?: boolean;
	imageScale?: number;
};

export const SelectListItem = <T extends BaseSelectItem>({
	item,
	selectedIds,
	onPress,
	multiple = false,
	imageScale = 1
}: SelectListItemProps<T>) => {
	const colors = useThemeColors();
	const isSelected = selectedIds.includes(item.id);

	return (
		<TouchableOpacity
			className="flex flex-row gap-4 p-2 items-center"
			onPress={() => onPress(item.id)}
		>
			<View className="w-[50px] h-[50px] rounded-[50px] overflow-hidden bg-white">
				<Image url={item.imageUrl} imageScale={imageScale} />
			</View>
			<Text className="flex-1">{item.name}</Text>

			{multiple ? (
				<Checkbox
					isChecked={isSelected}
					onChange={() => onPress(item.id)}
					className="mr-2"
				/>
			) : (
				isSelected && (
					<View className="w-16 items-center">
						<CheckIcon color={colors.secondary} />
					</View>
				)
			)}
		</TouchableOpacity>
	);
};
