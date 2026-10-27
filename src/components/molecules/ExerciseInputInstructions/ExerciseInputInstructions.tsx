import React from 'react';
import { View, TextInput } from 'react-native';
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
										className="flex-1 min-h-12 border rounded-lg px-3 py-2 text-white"
										placeholderTextColor="#9CA3AF"
									/>
								)}
							/>

							{errorMessage && (
								<Text className="text-red-500 text-xs ml-2">
									{errorMessage}
								</Text>
							)}
						</View>

						<IconButton
							variant="outline"
							size="sm"
							icon={<XIcon color={colors.secondary} />}
							onPress={() => {
								remove(index);
								removeInput(index);
							}}
							className="mr-1"
						/>
					</View>
				);
			})}

			{errorsMessage && (
				<Text className="text-red-500 mt-2">{errorsMessage}</Text>
			)}
		</View>
	);
};
