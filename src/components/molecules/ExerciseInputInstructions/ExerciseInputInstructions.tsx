import React from 'react';
import { TextInput, View } from 'react-native';
import {
	useFieldArray,
	Control,
	Controller,
	FieldErrors
} from 'react-hook-form';
import { Button, IconButton, Text } from '@/components/atoms';
import { PlusIcon, XIcon } from 'phosphor-react-native';
import { ExerciseFormData } from '@/modules/exercise/validation/exerciseFormSchema';
import { useKeyboard, useThemeColors } from '@/hooks';
import { cn } from '@/utils';

interface ExerciseInstructionsProps {
	control: Control<ExerciseFormData>;
	error: FieldErrors<ExerciseFormData>['instruction'];
}

export const ExerciseInputInstructions = ({
	control,
	error
}: ExerciseInstructionsProps) => {
	const colors = useThemeColors();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'instruction'
	});

	const errorsMessage = error?.message || error?.root?.message;

	const { registerInput, openKeyboard, removeInput, closeKeyboard } =
		useKeyboard();

	return (
		<View className="gap-3 my-5">
			<View className="flex flex-row justify-between gap-2">
				<Text>Instructions *</Text>
				<Button
					title="Add instruction"
					size="sm"
					variant="outline"
					iconLeft={<PlusIcon color={colors.primary} />}
					className="py-0.5 px-2"
					fullWidth={false}
					onPress={() => {
						const newIndex = fields.length;

						append({ text: '' });

						setTimeout(() => {
							closeKeyboard();
							openKeyboard(newIndex);
						}, 150);
					}}
				/>
			</View>

			{fields.map((field, index) => {
				const errorMessage = error?.[index]?.text?.message;
				return (
					<View key={field.id} className="flex-row items-center gap-2">
						<Text className="font-semibold w-6 text-center">{index + 1}.</Text>

						<View className="flex-1">
							<Controller
								control={control}
								name={`instruction.${index}.text`}
								render={({ field: { onChange, value, ref } }) => (
									<TextInput
										ref={(r) => {
											ref(r);
											registerInput(index, r);
										}}
										value={value}
										onChangeText={onChange}
										placeholder="Write instruction..."
										multiline
										textAlignVertical="top"
										placeholderTextColor={colors.mutedForeground}
										className={cn(
											'w-full min-h-0 border border-input rounded-xl px-4 py-2',
											'bg-transparent text-foreground dark:bg-input',
											'focus:border-ring',
											errorMessage &&
												'border-destructive focus:border-2 focus:border-destructive-focused focus:bg-destructive-focused-background dark:focus:bg-destructive-focused-background'
										)}
									/>
								)}
							/>

							{errorMessage && (
								<Text className="text-destructive text-xs ml-2">
									{errorMessage}
								</Text>
							)}
						</View>

						<IconButton
							// size="sm"
							onPress={() => {
								remove(index);
								removeInput(index);
							}}
							className="mr-1"
						>
							<XIcon color={colors.secondary} />
						</IconButton>
					</View>
				);
			})}

			{errorsMessage && (
				<Text className="text-destructive mt-2">{errorsMessage}</Text>
			)}
		</View>
	);
};
