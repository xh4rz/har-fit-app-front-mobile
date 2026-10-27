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
import { RoutineFormData } from '@/modules/routine/validation/routineFormSchema';
import { useKeyboard, useThemeColors } from '@/hooks';

interface ExerciseRoutineInputSetsProps {
	control: Control<RoutineFormData>;
	exerciseIndex: number;
	error: FieldErrors<RoutineFormData>['exercises'];
}

type InputValue = number | string | undefined;

export const ExerciseRoutineInputSets = ({
	control,
	exerciseIndex,
	error
}: ExerciseRoutineInputSetsProps) => {
	const colors = useThemeColors();

	const { fields, append, remove } = useFieldArray({
		control,
		name: `exercises.${exerciseIndex}.sets`
	});

	const setsError = error?.[exerciseIndex]?.sets;
	const errorsMessage = setsError?.message || setsError?.root?.message;

	const { registerInput, openKeyboard, removeInput, closeKeyboard } =
		useKeyboard();

	const handleChange = (
		text: string,
		onChange: (value: InputValue) => void,
		allowDecimal: boolean
	) => {
		if (text === '') {
			onChange(undefined);
			return;
		}

		if (!allowDecimal && text.includes('.')) return;

		if (allowDecimal) {
			if (text === '.' || text.endsWith('.')) {
				onChange(text);
				return;
			}

			if ((text.match(/\./g) || []).length > 1) return;
		}

		const numeric = Number(text);

		if (!isNaN(numeric)) {
			onChange(numeric);
		}
	};

	const getDisplayValue = (value: InputValue) => {
		if (typeof value === 'string') return value;
		if (value === undefined || value === null) return '';
		return String(value);
	};

	return (
		<View className="gap-3 mt-3">
			<View className="flex-row items-center px-1">
				<Text className="w-8 text-center text-gray-400">SET</Text>
				<Text className="flex-1 text-center text-gray-400">KG</Text>
				<Text className="flex-1 text-center text-gray-400">REPS</Text>
				<View className="w-8" />
			</View>

			{fields.map((field, index) => {
				const kgError = setsError?.[index]?.kg?.message;
				const repsError = setsError?.[index]?.reps?.message;

				return (
					<View key={field.id} className="gap-1">
						<View className="flex-row items-center gap-2">
							<Text className="w-8 text-center font-semibold">{index + 1}</Text>
							<View className="flex-1">
								<Controller
									control={control}
									name={`exercises.${exerciseIndex}.sets.${index}.kg`}
									render={({ field: { onChange, value, ref } }) => (
										<TextInput
											ref={(r) => {
												ref(r);
												registerInput(index * 2, r);
											}}
											value={getDisplayValue(value)}
											onChangeText={(text) =>
												handleChange(text, onChange, true)
											}
											keyboardType="decimal-pad"
											className="border rounded-lg px-3 py-2 text-white text-center"
											placeholderTextColor="#9CA3AF"
										/>
									)}
								/>
							</View>

							<View className="flex-1">
								<Controller
									control={control}
									name={`exercises.${exerciseIndex}.sets.${index}.reps`}
									render={({ field: { onChange, value, ref } }) => (
										<TextInput
											ref={(r) => {
												ref(r);
												registerInput(index * 2 + 1, r);
											}}
											value={getDisplayValue(value)}
											onChangeText={(text) =>
												handleChange(text, onChange, false)
											}
											keyboardType="number-pad"
											className="border rounded-lg px-3 py-2 text-white text-center"
											placeholderTextColor="#9CA3AF"
										/>
									)}
								/>
							</View>

							<IconButton
								variant="outline"
								size="sm"
								icon={<XIcon color={colors.secondary} />}
								onPress={() => {
									remove(index);
									removeInput(index * 2);
									removeInput(index * 2 + 1);
								}}
							/>
						</View>

						{(kgError || repsError) && (
							<View className="flex-row gap-2 ml-8">
								<View className="flex-1">
									{kgError && (
										<Text className="text-red-500 text-xs text-center">
											{kgError}
										</Text>
									)}
								</View>
								<View className="flex-1">
									{repsError && (
										<Text className="text-red-500 text-xs text-center">
											{repsError}
										</Text>
									)}
								</View>
								<View className="w-8" />
							</View>
						)}
					</View>
				);
			})}

			<Button
				title="Add set"
				variant="outline"
				iconLeft={<PlusIcon color={colors.primary} />}
				onPress={() => {
					const newIndex = fields.length;

					append({
						set: newIndex + 1,
						kg: 0,
						reps: 0
					});

					setTimeout(() => {
						closeKeyboard();
						openKeyboard(newIndex * 2);
					}, 150);
				}}
			/>

			{errorsMessage && (
				<Text className="text-red-500 mt-2">{errorsMessage}</Text>
			)}
		</View>
	);
};
