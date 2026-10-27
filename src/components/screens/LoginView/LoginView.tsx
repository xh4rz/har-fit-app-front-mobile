import { useCallback } from 'react';
import { View } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	LoginFormData,
	loginFormSchema
} from '@/modules/auth/validation/loginFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { AppBrand, Button, Text } from '@/components/atoms';
import { FormInput } from '@/components/molecules';
import { setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';
import { SignInIcon } from 'phosphor-react-native';

export const LoginView = () => {
	const insets = useSafeAreaInsets();

	const { login, loading } = useAuthStore();

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onLogin = async (data: LoginFormData) => {
		try {
			await login(data);
		} catch (error) {
			const errorObj = error as ApiError;
			if (errorObj.statusCode === 401) {
				setError('root', {
					type: 'custom',
					message: 'Invalid credentials'
				});

				return;
			}
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
			<View className="flex-1 justify-center">
				<View className="mb-8">
					<AppBrand className="mb-3" />
					<Text className="text-center text-xl font-semibold">
						Welcome back!
					</Text>
					<Text className="mt-2 text-center text-muted-foreground">
						Sign in to continue your fitness journey.
					</Text>
				</View>
				<View className="gap-2">
					<FormInput
						autoFocus
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
						isPassword
						disabled={loading}
					/>
				</View>
				{errors.root && (
					<Text variant="error" className="mt-2">
						{errors.root.message}
					</Text>
				)}
			</View>
			<View className="gap-4">
				<Button
					title="Login"
					variant="primary"
					onPress={handleSubmit(onLogin)}
					iconLeft={<SignInIcon />}
					loading={loading}
				/>
				<View className="flex-row justify-center items-center gap-1">
					<Text>Don&apos;t have an account?</Text>
					<Link
						disabled={loading}
						href="/auth/signup"
						className={`font-bold text-secondary ${
							loading ? 'opacity-50' : 'opacity-100'
						}`}
					>
						Sign Up
					</Link>
				</View>
			</View>
		</View>
	);
};
