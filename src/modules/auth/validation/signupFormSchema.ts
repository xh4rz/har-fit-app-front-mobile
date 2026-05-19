import { z } from 'zod';

export const passwordValidationRules = [
	{
		label: '• 1 uppercase',
		test: (value: string) => /[A-Z]/.test(value)
	},
	{
		label: '• 1 lowercase',
		test: (value: string) => /[a-z]/.test(value)
	},
	{
		label: '• 1 number',
		test: (value: string) => /\d/.test(value)
	},
	{
		label: '• 1 special (@$!%*?&.#_-)',
		test: (value: string) => /[@$!%*?&.#_-]/.test(value)
	}
];

export const signupFormSchema = z
	.object({
		fullName: z
			.string()
			.min(1, 'Full Name is required')
			.min(10, 'Full Name must be at least 10 characters')
			.max(50, 'Full Name can have a maximum of 50 characters')
			.regex(/^[A-Za-z\s]+$/, 'Full Name must contain only letters'),
		email: z
			.string()
			.min(1, 'Email is required')
			.email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password can have a maximum of 20 characters')
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
				'Invalid password format'
			),
		confirmPassword: z.string().min(1, 'Please repeat your password')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});
