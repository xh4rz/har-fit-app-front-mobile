import React, {
	ReactNode,
	useRef,
	useEffect,
	useCallback,
	useMemo
} from 'react';
import {
	BottomSheetBackdrop,
	BottomSheetModal as BottomSheetModalGorhom,
	BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { useThemeColors } from '@/hooks';
import { colors } from '@/constants/colors';
import { Separator, Text } from '@/components/atoms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Keyboard } from 'react-native';

interface BottomSheetModalListProps {
	title: string;
	show: boolean;
	setShow: (value: boolean) => void;
	children: ReactNode;
	mode?: 'normal' | 'list';
	snapPoints?: string[] | number[];
}

export const BottomSheetModal = ({
	title,
	show,
	setShow,
	children,
	mode = 'normal',
	snapPoints = ['60%', '80%']
}: BottomSheetModalListProps) => {
	const insets = useSafeAreaInsets();
	const theme = useThemeColors();
	const bottomSheetModalRef = useRef<BottomSheetModalGorhom>(null);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'black'
				}}
			/>
		),
		[]
	);

	const memoSnapPoints = useMemo(() => {
		if (mode !== 'list') return undefined;

		return snapPoints;
	}, [snapPoints, mode]);

	const modalProps =
		mode === 'list'
			? { snapPoints: memoSnapPoints, enableDynamicSizing: false }
			: { containerStyle: { paddingBottom: insets.bottom + 500 } };

	useEffect(() => {
		bottomSheetModalRef.current?.[show ? 'present' : 'dismiss']();
	}, [show]);

	useEffect(() => {
		if (show) {
			const timeout = setTimeout(() => {
				Keyboard.dismiss();
			}, 300);
			return () => clearTimeout(timeout);
		}
	}, [show]);

	return (
		<BottomSheetModalGorhom
			ref={bottomSheetModalRef}
			onDismiss={() => setShow(false)}
			backdropComponent={renderBackdrop}
			backgroundStyle={{ backgroundColor: theme.card }}
			handleIndicatorStyle={{ backgroundColor: colors.primary }}
			{...modalProps}
		>
			{mode === 'normal' ? (
				<BottomSheetScrollView
					contentContainerStyle={{ paddingBottom: insets.bottom }}
				>
					<Text className="text-lg text-center m-5">{title}</Text>
					<Separator />
					{children}
				</BottomSheetScrollView>
			) : (
				<>
					<Text className="text-lg text-center m-5">{title}</Text>
					<Separator />
					{children}
				</>
			)}
		</BottomSheetModalGorhom>
	);
};
