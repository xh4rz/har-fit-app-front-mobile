import React, { ReactNode } from 'react';
import { Pressable, Modal as RNModal } from 'react-native';
import { Text } from '../Text';

interface ModalProps {
	title?: string;
	description: string;
	visible: boolean;
	setVisible: (value: boolean) => void;
	children: ReactNode;
	animationType?: 'none' | 'slide' | 'fade';
	highlight?: string;
}

export const Modal = ({
	title,
	description,
	visible,
	setVisible,
	children,
	animationType = 'fade',
	highlight
}: ModalProps) => {
	return (
		<RNModal
			transparent
			visible={visible}
			animationType={animationType}
			onRequestClose={() => setVisible(false)}
			backdropColor={'red'}
		>
			<Pressable
				className="flex-1 justify-center items-center bg-black/60 px-4"
				onPress={() => setVisible(false)}
			>
				<Pressable className="bg-card rounded-2xl p-6 w-full">
					{title && (
						<Text className="text-lg font-bold text-center mb-2">{title}</Text>
					)}
					<Text className="text-sm text-center mb-6">
						{description}{' '}
						{highlight && <Text className="font-bold">{highlight}</Text>}
					</Text>
					{children}
				</Pressable>
			</Pressable>
		</RNModal>
	);
};
