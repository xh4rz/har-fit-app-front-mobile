'use client';

import { ReactNode } from 'react';

import { cn } from '@/utils';

import { View } from 'react-native';
import { IconButton, Image, Text } from '@/components/atoms';
import { useThemeColors, useThumbnail } from '@/hooks';
import { TrashIcon } from 'phosphor-react-native';

interface ExerciseSummaryItemProps {
	exerciseId: string;
	title: string;
	video: string;
	description: ReactNode;
	onRemove?: () => void;
	className?: string;
}

export const ExerciseSummaryItem = ({
	exerciseId,
	title,
	video,
	description,
	onRemove,
	className
}: ExerciseSummaryItemProps) => {
	const colors = useThemeColors();
	const thumbnail = useThumbnail(video);

	return (
		<View className={cn('flex flex-row gap-2 items-center', className)}>
			<View className="w-[40px] h-[40px] rounded-full overflow-hidden">
				<Image url={thumbnail} />
			</View>
			<View className="flex-1 ml-2">
				<Text>{title}</Text>
				<Text className="text-muted-foreground">{description}</Text>
			</View>

			{onRemove && (
				<IconButton variant="destructive" onPress={onRemove}>
					<TrashIcon color={colors.destructive} />
				</IconButton>
			)}
		</View>
	);
};
