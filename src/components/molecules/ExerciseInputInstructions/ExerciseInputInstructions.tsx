import React from 'react';
import { View } from 'react-native';
import {
	useFieldArray,
	Control,
	Controller,
	FieldErrors
} from 'react-hook-form';
import { Button, IconButton, Text, TextInput } from '@/components/atoms';
import { PlusIcon, XIcon } from 'phosphor-react-native';
import { ExerciseFormData } from '@/modules/exercise/validation/exerciseFormSchema';
import { useKeyboard, useThemeColors } from '@/hooks';

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
				<Text className="ml-2">Instructions *</Text>
				<Button
					title="Add instruction"
					size="sm"
					variant="outline"
					iconLeft={<PlusIcon color={colors.secondary} />}
					className="border-secondary"
					textClassName="text-secondary"
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
										variant="line"
										value={value}
										onChangeText={onChange}
										placeholder="Write instruction..."
										multiline
										textAlignVertical="top"
										hasError={!!errorMessage}
										className="min-h-0 pt-2 pb-2 !bg-transparent"
									/>
								)}
							/>

							{errorMessage && (
								<Text className="text-destructive text-xs ml-1 mt-1">
									{errorMessage}
								</Text>
							)}
						</View>

						<IconButton
							hitSlop={10}
							onPress={() => {
								remove(index);
								removeInput(index);
							}}
							className="mr-1"
						>
							<XIcon color={colors.secondary} size={18} />
						</IconButton>
					</View>
				);
			})}

			{errorsMessage && (
				<Text className="text-destructive ml-2">{errorsMessage}</Text>
			)}
		</View>
	);
};
