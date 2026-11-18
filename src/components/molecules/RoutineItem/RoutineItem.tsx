import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, IconButton, Text } from '@/components/atoms';
import { BottomSheetOptions } from '@/components/organisms';
import { cn } from '@/utils';
import { DotsThreeIcon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

interface RoutineItemProps {
	routine: {
		id: string;
		title: string;
		exercises: { title: string }[];
	};
	isActive: boolean;
	isStartDisabled: boolean;
	timer: string;
	onEdit: () => void;
	onDelete: () => void;
	onStart: () => void;
}

export const RoutineItem = ({
	routine,
	isActive,
	isStartDisabled,
	timer,
	onEdit,
	onDelete,
	onStart
}: RoutineItemProps) => {
	const colors = useThemeColors();
	const [showModalOptions, setShowModalOptions] = useState(false);

	return (
		<>
			<Card className="min-h-36 bg-muted">
				<View className="flex-row items-center justify-between gap-2">
					<Text numberOfLines={1} className="flex-1 font-bold">
						{routine.title}
					</Text>
					<IconButton
						variant="ghost"
						hitSlop={8}
						disabled={isActive}
						onPress={() => setShowModalOptions(true)}
						accessibilityLabel="Open routine options"
					>
						<DotsThreeIcon size={24} color={colors.secondary} />
					</IconButton>
				</View>
				<Text
					numberOfLines={2}
					className="mb-4 text-sm text-muted-foreground text-left"
				>
					{routine.exercises.map((exercise) => exercise.title).join(', ')}
				</Text>
				<Button
					title={isActive ? `Workout ${timer}` : 'Start Workout'}
					variant={isActive ? 'secondary' : 'primary'}
					size="sm"
					className={cn(
						'mt-auto',
						isActive && 'bg-green-500 active:bg-green-600'
					)}
					disabled={isStartDisabled}
					onPress={onStart}
				/>
			</Card>
			<BottomSheetOptions
				show={showModalOptions}
				setShow={setShowModalOptions}
				editLabel="Edit Routine"
				deleteLabel="Delete Routine"
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</>
	);
};
