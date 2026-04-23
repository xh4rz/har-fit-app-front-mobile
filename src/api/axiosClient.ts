import axios, { AxiosRequestConfig } from 'axios';
import { StorageAdapter } from '@/adapters/storage-adapter';
import { parseAxiosError } from '@/utils';
import { authRefreshToken } from '@/modules/auth/services/auth';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const baseConfig: AxiosRequestConfig = {
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'x-client-type': 'mobile'
	}
};

export const axiosAuthClient = axios.create(baseConfig);

const axiosClient = axios.create(baseConfig);

axiosAuthClient.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(parseAxiosError(error));
	}
);

axiosClient.interceptors.request.use(
	async (config) => {
		const accessToken = await StorageAdapter.getItem('accessToken');

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			try {
				const refreshToken = await StorageAdapter.getItem('refreshToken');

				if (!refreshToken) {
					throw new Error('No refresh token available');
				}

				const data = await authRefreshToken(refreshToken);

				await StorageAdapter.setItem('accessToken', data.accessToken);
				await StorageAdapter.setItem('refreshToken', data.refreshToken);

				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

				return axiosClient(originalRequest);
			} catch (error) {
				await useAuthStore.getState().logout();

				return Promise.reject(parseAxiosError(error));
			}
		}
		return Promise.reject(parseAxiosError(error));
	}
);

export default axiosClient;
