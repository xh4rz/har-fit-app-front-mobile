import { useState } from 'react';
import { View, type TextInputProps } from 'react-native';
import { cn } from '@/utils';
import {
	Controller,
	FieldPath,
	type Control,
	type FieldValues
} from 'react-hook-form';
import {
	FormLabel,
	PasswordVisibilityToggle,
	Text,
	TextInput
} from '@/components/atoms';
import type {
	TextInputState,
	TextInputVariant
} from '@/components/atoms/TextInput';

type VisualState = TextInputState;

type FormInputProps<T extends FieldValues> = TextInputProps & {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	required?: boolean;
	helperText?: string;
	disabled?: boolean;
	isPassword?: boolean;
	variant?: TextInputVariant;
	className?: string;
};

export const FormInput = <T extends FieldValues>({
	name,
	control,
	helperText,
	label = '',
	required = false,
	disabled = false,
	isPassword = false,
	variant = 'outlined',
	className,
	...textInputProps
}: FormInputProps<T>) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value, ref }, fieldState }) => {
				const error = fieldState.error;

				const visualState: VisualState = error
					? isFocused
						? 'errorFocused'
						: 'error'
					: isFocused
						? 'focused'
						: 'default';

				return (
					<View className={cn('w-full', className)}>
						<View className="relative">
							{label && (
								<FormLabel
									label={label}
									required={required}
									hasError={!!error}
									variant={variant}
									disabled={disabled}
								/>
							)}

							<TextInput
								{...textInputProps}
								ref={ref}
								editable={!disabled}
								value={value}
								onChangeText={onChange}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								secureTextEntry={isPassword && !showPassword}
								variant={variant}
								state={visualState}
								disabled={disabled}
								className={cn(isPassword && 'pr-12')}
							/>

							{isPassword && (
								<PasswordVisibilityToggle
									visible={showPassword}
									focused={isFocused}
									hasError={!!error}
									disabled={disabled}
									onPress={() => setShowPassword(!showPassword)}
								/>
							)}
						</View>

						{error?.message ? (
							<Text variant="error" className="mt-1 ml-1 text-sm">
								{error.message}
							</Text>
						) : helperText ? (
							<Text className="mt-1 ml-1 text-sm text-muted-foreground">
								{helperText}
							</Text>
						) : null}
					</View>
				);
			}}
		/>
	);
};
