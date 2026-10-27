import type { AxiosRequestConfig } from 'axios';

export const baseConfig: AxiosRequestConfig = {
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'x-client-type': 'mobile'
	}
};
