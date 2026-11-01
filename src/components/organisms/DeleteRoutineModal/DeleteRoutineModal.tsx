import React from 'react';
import { View } from 'react-native';
import { Button, Modal } from '@/components/atoms';

interface DeleteRoutineModalProps {
	visible: boolean;
	setVisible: (value: boolean) => void;
	onDelete: () => void;
	loading?: boolean;
}

export const DeleteRoutineModal = ({
	visible,
	setVisible,
	onDelete,
	loading
}: DeleteRoutineModalProps) => {
	return (
		<Modal
			showIconDelete
			description="Are you sure you want to delete this routine?"
			visible={visible}
			setVisible={setVisible}
		>
			<View className="flex gap-3">
				<Button
					title="Delete Routine"
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
