import React, { ReactNode } from 'react';
import { Pressable, Modal as RNModal, View } from 'react-native';
import { Text } from '../Text';
import { ViewCard } from '../ViewCard';
import { useThemeColors } from '@/hooks';
import { TrashIcon } from 'phosphor-react-native';

interface ModalProps {
	title?: string;
	description: string;
	visible: boolean;
	setVisible: (value: boolean) => void;
	children: ReactNode;
	animationType?: 'none' | 'slide' | 'fade';
	showIconDelete?: boolean;
}

export const Modal = ({
	title,
	description,
	visible,
	setVisible,
	children,
	animationType = 'fade',
	showIconDelete = false
}: ModalProps) => {
	const colors = useThemeColors();
	return (
		<RNModal
			transparent
			visible={visible}
			animationType={animationType}
			onRequestClose={() => setVisible(false)}
			backdropColor="red"
		>
			<Pressable
				className="flex-1 justify-center items-center bg-black/60 px-4"
				onPress={() => setVisible(false)}
			>
				<ViewCard className="p-6 flex flex-col justify-center items-center">
					{showIconDelete && (
						<View className="mb-4 p-1 bg-muted rounded-lg">
							<TrashIcon color={colors.destructive} />
						</View>
					)}
					{title && (
						<Text className="text-lg font-bold text-center mb-2">{title}</Text>
					)}
					<Text className="text-sm text-muted-foreground text-center mb-6">
						{description}{' '}
					</Text>
					<View className="w-full">{children}</View>
				</ViewCard>
			</Pressable>
		</RNModal>
	);
};
