import { z } from 'zod';

export const passwordStrengthColor = (score: number) => {
	if (score === 0) return 'bg-border';
	if (score <= 1) return 'bg-destructive';
	if (score <= 2) return 'bg-orange-500 ';
	if (score <= 3) return 'bg-amber-500';
	if (score === 4) return 'bg-yellow-400';
	return 'bg-green-500';
};

export const passwordStrengthText = (score: number) => {
	if (score === 0) return 'Enter a password';
	if (score <= 2) return 'Weak password';
	if (score <= 3) return 'Medium password';
	if (score === 4) return 'Strong password';
	return 'Very strong password';
};

export const passwordRequirements = [
	{ regex: /.{6,}/, text: 'At least 6 characters' },
	{ regex: /[a-z]/, text: 'At least 1 lowercase letter' },
	{ regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
	{ regex: /\d/, text: 'At least 1 number' },
	{
		regex: /[@$!%*?&.#_-]/,
		text: 'At least 1 special character (@$!%*?&.#_-)'
	}
];

export const signupFormSchema = z
	.object({
		username: z
			.string()
			.min(1, 'Username is required')
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'Username can have a maximum of 20 characters')
			.regex(
				/^[a-zA-Z][a-zA-Z0-9_]*$/,
				'Username must begin with a letter and may contain numbers or underscores (_)'
			),
		fullname: z
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

export type SignUpFormData = z.infer<typeof signupFormSchema>;
