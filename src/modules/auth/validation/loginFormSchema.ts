import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(20, 'Password can have a maximum of 20 characters')
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
