import { axiosAuthClient } from '@/api/axiosClient';
import { Auth, Token } from '@/infrastructure/interfaces';

export const authLogin = async (email: string, password: string) => {
	email = email.toLowerCase();

	try {
		const { data } = await axiosAuthClient.post<Auth>('/auth/login', {
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const authRegister = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const { data } = await axiosAuthClient.post<Auth>('/auth/register', {
			fullName: name,
			email,
			password
		});

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
