import React from 'react';
import { View } from 'react-native';
import { Button, Modal } from '@/components/atoms';

interface Props {
	exerciseTitle: string;
	visible: boolean;
	setVisible: (value: boolean) => void;
	onDelete: () => void;
	loading?: boolean;
}

export const DeleteExerciseModal = ({
	exerciseTitle,
	visible,
	setVisible,
	onDelete,
	loading
}: Props) => {
	return (
		<Modal
			title="Delete Exercise"
			description="Are you sure you want to delete the"
			highlight={exerciseTitle}
			visible={visible}
			setVisible={setVisible}
		>
			<View className="flex gap-3">
				<Button
					title="Delete Exercise"
					variant="destructive"
					onPress={onDelete}
					loading={loading}
				/>
				<Button
					title="Cancel"
					variant="outline"
					onPress={() => setVisible(false)}
				/>
			</View>
		</Modal>
	);
};
