import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { FieldErrors } from 'react-hook-form';
import { VideoPlayer } from '../VideoPlayer';
import { UploadSimpleIcon } from 'phosphor-react-native';
import { ExerciseFormData } from '@/modules/exercise/validation/exerciseFormSchema';
import { Text } from '@/components/atoms';
import { useThemeColors } from '@/hooks';

interface ExerciseVideoUploadProps {
	videoUri: string;
	openPicker: () => void;
	error: FieldErrors<ExerciseFormData>['file'];
	loading: boolean;
}

export const ExerciseVideoUpload = ({
	videoUri,
	openPicker,
	error,
	loading = false
}: ExerciseVideoUploadProps) => {
	const colors = useThemeColors();
	return (
		<TouchableOpacity
			className={`w-full h-72 rounded-xl ${error ? 'border-destructive' : 'border-border'}
			 border-2 border-dashed items-center justify-center mb-5 p-1`}
			onPress={openPicker}
		>
			{loading ? (
				<ActivityIndicator size="large" color={colors.primary} />
			) : error?.message ? (
				<View className="items-center gap-2">
					<UploadSimpleIcon size={40} color={colors.destructive} />
					<Text className="text-sm text-destructive">{error.message}</Text>
				</View>
			) : videoUri ? (
				<VideoPlayer url={videoUri} />
			) : (
				<View className="items-center gap-2">
					<UploadSimpleIcon size={40} color={colors.secondary} />
					<Text className="text-foreground text-sm">
						Upload exercise video *
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};
