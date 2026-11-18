import React from 'react';
import { View } from 'react-native';
import { Button, Modal } from '@/components/atoms';

interface DeleteModalProps {
	title: string;
	description: string;
	confirmLabel?: string;
	visible: boolean;
	setVisible: (value: boolean) => void;
	onDelete: () => void;
	loading?: boolean;
}

export const DeleteModal = ({
	title,
	description,
	confirmLabel = 'Delete',
	visible,
	setVisible,
	onDelete,
	loading
}: DeleteModalProps) => (
	<Modal
		title={title}
		showIconDelete
		description={description}
		visible={visible}
		setVisible={setVisible}
	>
		<View className="flex gap-3">
			<Button
				title={confirmLabel}
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
