import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import {
	passwordRequirements,
	passwordStrengthColor,
	passwordStrengthText,
	signupFormSchema
} from '@/modules/auth/validation/signupFormSchema';
import { FormInput } from '@/components/molecules';
import { Button, Text } from '@/components/atoms';
import { CheckIcon, SignInIcon, XIcon } from 'phosphor-react-native';
import { cn, setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';

type SignupFormData = z.infer<typeof signupFormSchema>;

export const SignupView = () => {
	const insets = useSafeAreaInsets();

	const { register, loading } = useAuthStore();

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors }
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupFormSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			fullname: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const password = useWatch({
		control,
		name: 'password',
		defaultValue: ''
	});

	const passwordChecks = passwordRequirements.map((i) => ({
		isValid: i.regex.test(password),
		description: i.text
	}));

	const passwordStrengthScore = useMemo(() => {
		return passwordChecks.filter((i) => i.isValid).length;
	}, [passwordChecks]);

	const onRegister = async (data: SignupFormData) => {
		try {
			await register(data);
		} catch (error) {
			const errorObj = error as ApiError;
			setFormError(setError, errorObj);
		}
	};

	useFocusEffect(
		useCallback(() => {
			return () => clearErrors();
		}, [clearErrors])
	);

	return (
		<View
			style={{
				paddingBottom: insets.bottom + 20
			}}
			className="flex-1 justify-between p-4"
		>
			<View className="flex-1 gap-2">
				<FormInput
					autoFocus
					required
					autoCapitalize="none"
					control={control}
					name="username"
					label="Username"
					placeholder="Enter your Username"
					disabled={loading}
				/>

				<FormInput
					required
					autoCapitalize="none"
					control={control}
					name="fullname"
					label="Full Name"
					placeholder="Enter your Full Name"
					disabled={loading}
				/>

				<FormInput
					required
					autoCapitalize="none"
					keyboardType="email-address"
					control={control}
					name="email"
					label="Email"
					placeholder="Enter your email"
					disabled={loading}
				/>

				<FormInput
					required
					control={control}
					autoCapitalize="none"
					name="password"
					label="Password"
					placeholder="Enter your password"
					isPassword={true}
					disabled={loading}
				/>

				<FormInput
					required
					control={control}
					autoCapitalize="none"
					name="confirmPassword"
					label="Repeat Password"
					placeholder="Repeat your password"
					isPassword={true}
					disabled={loading}
				/>

				<View className="mt-6 w-full max-w-xs gap-2">
					<View className="mb-4 h-1 w-full flex-row gap-1">
						{Array.from({ length: 5 }).map((_, index) => (
							<View
								key={index}
								className={cn(
									'h-full flex-1 rounded-full',
									index < passwordStrengthScore
										? passwordStrengthColor(passwordStrengthScore)
										: 'bg-border'
								)}
							/>
						))}
					</View>
					<Text className="text-sm font-medium text-foreground">
						{passwordStrengthText(passwordStrengthScore)}. Must contain:
					</Text>
					<View className="mb-4 gap-1">
						{passwordChecks.map((i, index) => (
							<View key={index} className="flex-row items-center gap-2">
								{i.isValid ? (
									<CheckIcon size={16} color="#16a34a" weight="bold" />
								) : (
									<XIcon size={16} color="#9ca3af" />
								)}

								<Text
									className={cn(
										'text-sm',
										i.isValid
											? 'text-green-600 dark:text-green-400'
											: 'text-muted-foreground'
									)}
								>
									{i.description}
								</Text>
							</View>
						))}
					</View>
				</View>

				{errors.root && (
					<Text className="mb-5 text-destructive">{errors.root.message}</Text>
				)}
			</View>
			<View className="gap-4">
				<Button
					title="Register"
					variant="primary"
					onPress={handleSubmit(onRegister)}
					iconLeft={<SignInIcon />}
					loading={loading}
				/>

				<View className="flex-row justify-center items-center gap-1">
					<Text>Already have an account? </Text>
					<Link
						disabled={loading}
						href="/auth/login"
						className={`font-bold text-secondary ${
							loading ? 'opacity-50' : 'opacity-100'
						}`}
					>
						Login
					</Link>
				</View>
			</View>
		</View>
	);
};
