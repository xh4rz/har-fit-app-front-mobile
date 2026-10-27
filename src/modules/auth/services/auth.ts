import { axiosAuthClient } from '@/api/axiosAuthClient';
import {
	AuthLoginRequest,
	AuthRegisterRequest,
	AuthResponse,
	Token
} from '@/infrastructure/interfaces';

export const authLogin = async ({ email, password }: AuthLoginRequest) => {
	email = email.toLowerCase();

	try {
		const { data } = await axiosAuthClient.post<AuthResponse>('/auth/login', {
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const authRegister = async ({
	username,
	fullname,
	email,
	password
}: AuthRegisterRequest) => {
	try {
		const { data } = await axiosAuthClient.post<AuthResponse>(
			'/auth/register',
			{
				username,
				fullname,
				email,
				password
			}
		);

		return data;
	} catch (error) {
		throw error;
	}
};

export const authRefreshToken = async (refreshToken: string) => {
	try {
		const { data } = await axiosAuthClient.post<Token>('/auth/refresh-token', {
			refreshToken
		});

		return data;
	} catch (error) {
		throw error;
	}
};
