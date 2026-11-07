import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import {
	useFieldArray,
	Control,
	Controller,
	FieldErrors
} from 'react-hook-form';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';
import {
	Button,
	Checkbox,
	IconButton,
	Text,
	TextInput
} from '@/components/atoms';
import { useKeyboard, useThemeColors } from '@/hooks';
import { PlusIcon, XIcon } from 'phosphor-react-native';

interface ExerciseRoutineSetsProps {
	control: Control<RoutineFormInput>;
	exerciseIndex: number;
	error: FieldErrors<RoutineFormInput>['exercises'];
	isWorkout?: boolean;
}

type InputValue = number | string;

export const ExerciseRoutineSets = ({
	control,
	exerciseIndex,
	error,
	isWorkout = false
}: ExerciseRoutineSetsProps) => {
	const colors = useThemeColors();
	const { fields, append, remove } = useFieldArray({
		control,
		name: `exercises.${exerciseIndex}.sets`
	});
	const setsError = error?.[exerciseIndex]?.sets;
	const errorsMessage = setsError?.message || setsError?.root?.message;
	const initialized = useRef(false);

	const { registerInput, openKeyboard, removeInput, closeKeyboard } =
		useKeyboard();

	const handleChange = (
		text: string,
		onChange: (value: InputValue) => void,
		allowDecimal: boolean
	) => {
		if (text === '') {
			onChange('');
			return;
		}

		if (text.length > 4) return;

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

	const getDisplayValue = (value: unknown) => {
		if (value === null || value === undefined) return '';
		return String(value);
	};

	const createSet = (set: number) => ({
		set,
		kg: '',
		reps: '',
		completed: false
	});

	useEffect(() => {
		if (initialized.current) return;

		if (fields.length === 0) {
			append(createSet(1));
		}

		initialized.current = true;
	}, []);

	return (
		<View>
			<View className="flex-row items-center">
				<Text className="w-8 text-center">SET</Text>
				<Text className="flex-1 text-center">KG</Text>
				<Text className="flex-1 text-center">REPS</Text>
				{isWorkout && <View className="w-8" />}
				<View className="w-8" />
			</View>

			<View className="gap-2 mb-4">
				{fields.map((field, index) => {
					const kgError = setsError?.[index]?.kg?.message;
					const repsError = setsError?.[index]?.reps?.message;

					return (
						<Controller
							key={field.id}
							control={control}
							name={`exercises.${exerciseIndex}.sets.${index}.completed`}
							render={({ field: completedField }) => (
								<View
									className={`gap-1 rounded-md p-1 ${
										isWorkout && completedField.value && 'bg-green-600/30'
									}`}
								>
									<View className="flex-row items-center gap-2">
										<Text className="w-8 text-center font-semibold text-secondary">
											{index + 1}
										</Text>

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
														hasError={!!kgError}
														className="min-h-0 py-2 text-center"
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
														hasError={!!repsError}
														className="min-h-0 py-2 text-center"
													/>
												)}
											/>
										</View>

										{isWorkout && (
											<Checkbox
												variant="success"
												isChecked={completedField.value === true}
												onChange={completedField.onChange}
												className="size-5"
											/>
										)}

										<IconButton
											variant="destructive"
											onPress={() => {
												remove(index);
												removeInput(index * 2);
												removeInput(index * 2 + 1);
											}}
										>
											<XIcon color={colors.destructive} size={14} />
										</IconButton>
									</View>

									{(kgError || repsError) && (
										<View className="flex-row gap-2">
											<View className="w-8" />
											<View className="flex-1">
												{kgError && (
													<Text className="text-destructive text-xs text-center">
														{kgError}
													</Text>
												)}
											</View>
											<View className="flex-1">
												{repsError && (
													<Text className="text-destructive text-xs text-center">
														{repsError}
													</Text>
												)}
											</View>
											{isWorkout && <View className="w-8" />}
											<View className="w-8" />
										</View>
									)}
								</View>
							)}
						/>
					);
				})}
			</View>

			<Button
				title="Add set"
				variant="outline"
				iconLeft={<PlusIcon color={colors.secondary} />}
				textClassName="text-secondary"
				onPress={() => {
					const newIndex = fields.length;

					append(createSet(newIndex + 1));

					setTimeout(() => {
						closeKeyboard();
						openKeyboard(newIndex * 2);
					}, 150);
				}}
			/>

			{!!errorsMessage && (
				<Text className="text-sm text-destructive">{errorsMessage}</Text>
			)}
		</View>
	);
};
