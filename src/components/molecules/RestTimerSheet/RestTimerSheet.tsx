import { useEffect, useState } from 'react';
import {
	View,
	type ListRenderItemInfo,
	type NativeScrollEvent,
	type NativeSyntheticEvent
} from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text } from '@/components/atoms';
import { BottomSheetModal } from '@/components/organisms/BottomSheetModal';

const SNAP_POINTS = [360];
const ITEM_HEIGHT = 48;

interface RestTimerOption {
	id: number;
	name: string;
}

interface TimePickerProps {
	visible: boolean;
	data: RestTimerOption[];
	exerciseTitle: string;
	onClose: () => void;
	onConfirm: (seconds: number) => void;
}

export const RestTimerSheet = ({
	visible,
	data,
	exerciseTitle,
	onClose,
	onConfirm
}: TimePickerProps) => {
	const insets = useSafeAreaInsets();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selected = data[selectedIndex];

	useEffect(() => {
		if (visible) setSelectedIndex(0);
	}, [visible, data]);

	const handleScroll = ({
		nativeEvent
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(nativeEvent.contentOffset.y / ITEM_HEIGHT);
		setSelectedIndex(Math.max(0, Math.min(data.length - 1, index)));
	};

	return (
		<BottomSheetModal
			title="Rest Timer"
			description={exerciseTitle}
			show={visible}
			setShow={onClose}
			mode="list"
			snapPoints={SNAP_POINTS}
		>
			<View className="px-6 pt-5" style={{ paddingBottom: insets.bottom + 20 }}>
				<View className="h-[144px] overflow-hidden">
					<View
						pointerEvents="none"
						className="absolute top-[48px] left-0 right-0 h-[48px] rounded-lg bg-muted"
					/>
					<BottomSheetFlatList
						key={visible ? 'open' : 'closed'}
						style={{ height: 144, flexGrow: 0 }}
						data={data}
						extraData={selectedIndex}
						keyExtractor={(item: RestTimerOption) => item.id.toString()}
						snapToInterval={ITEM_HEIGHT}
						bounces={true}
						contentInsetAdjustmentBehavior="never"
						showsVerticalScrollIndicator={false}
						onScroll={handleScroll}
						renderItem={({
							item,
							index
						}: ListRenderItemInfo<RestTimerOption>) => (
							<Text
								className={`leading-[48px] text-center font-medium ${
									index === selectedIndex
										? 'text-foreground'
										: 'text-muted-foreground'
								}`}
								numberOfLines={1}
							>
								{item.name}
							</Text>
						)}
						contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
					/>
				</View>
				<Button
					title="Done"
					className="mt-6"
					disabled={!selected}
					onPress={() => onConfirm(selected.id)}
				/>
			</View>
		</BottomSheetModal>
	);
};
