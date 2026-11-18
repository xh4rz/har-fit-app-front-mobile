import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '../BottomSheetModal';
import { Text } from '@/components/atoms';
import { useThemeColors } from '@/hooks';
import {
	CaretRightIcon,
	PencilSimpleIcon,
	TrashIcon
} from 'phosphor-react-native';

interface BottomSheetOptionsProps {
	show: boolean;
	setShow: (value: boolean) => void;
	editLabel: string;
	deleteLabel: string;
	onEdit: () => void;
	onDelete: () => void;
}

export const BottomSheetOptions = ({
	show,
	setShow,
	editLabel,
	deleteLabel,
	onEdit,
	onDelete
}: BottomSheetOptionsProps) => {
	const colors = useThemeColors();
	const sections = [
		{
			title: editLabel,
			icon: <PencilSimpleIcon color={colors.foreground} />,
			onPress: onEdit
		},
		{
			title: deleteLabel,
			icon: <TrashIcon color={colors.destructive} />,
			onPress: onDelete
		}
	];

	return (
		<BottomSheetModal title="Select Option" show={show} setShow={setShow}>
			<View className="m-6">
				{sections.map((i, index) => (
					<TouchableOpacity
						key={index}
						className="flex-row gap-6 p-4 items-center"
						activeOpacity={0.3}
						onPress={() => {
							i.onPress();
							setShow(false);
						}}
					>
						{i.icon}
						<Text
							variant={`${index === 1 ? 'error' : 'default'}`}
							className="font-medium flex-1"
						>
							{i.title}
						</Text>
						<CaretRightIcon
							size={14}
							color={index === 1 ? colors.destructive : colors.foreground}
						/>
					</TouchableOpacity>
				))}
			</View>
		</BottomSheetModal>
	);
};
