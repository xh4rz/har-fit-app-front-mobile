import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '../BottomSheetModal';
import {
	CaretRightIcon,
	FileVideoIcon,
	ReceiptXIcon,
	VideoCameraIcon
} from 'phosphor-react-native';
import { Text } from '@/components/atoms';
import { useThemeColors } from '@/hooks';

interface Props {
	show: boolean;
	setShow: (value: boolean) => void;
	disabledVideo: boolean;
	selectVideo: () => void;
	captureVideo: () => void;
	removeVideo: () => void;
}

export const BottomSheetVideoOptions = ({
	show,
	setShow,
	disabledVideo,
	selectVideo,
	captureVideo,
	removeVideo
}: Props) => {
	const colors = useThemeColors();

	const sections = [
		{
			title: 'Select video from gallery',
			icon: <FileVideoIcon color={colors.foreground} />,
			onPress: selectVideo
		},
		{
			title: 'Record video',
			icon: <VideoCameraIcon color={colors.foreground} />,
			onPress: captureVideo
		},
		{
			title: 'Remove video',
			icon: <ReceiptXIcon color={colors.foreground} />,
			onPress: removeVideo,
			disabled: disabledVideo
		}
	];

	return (
		<BottomSheetModal title="Add Video" show={show} setShow={setShow}>
			<View className="m-6">
				{sections.map((i, index) => {
					const isDisabled = i.disabled;
					return (
						<TouchableOpacity
							key={index}
							className={`flex-row gap-6 p-4 items-center ${isDisabled ? 'opacity-40' : 'opacity-100'}`}
							activeOpacity={0.3}
							onPress={() => {
								if (!isDisabled) {
									i.onPress();
									setShow(false);
								}
							}}
							disabled={isDisabled}
						>
							{i.icon}
							<Text className="text-white font-medium flex-1">{i.title}</Text>
							<CaretRightIcon size={14} color={colors.foreground} />
						</TouchableOpacity>
					);
				})}
			</View>
		</BottomSheetModal>
	);
};
