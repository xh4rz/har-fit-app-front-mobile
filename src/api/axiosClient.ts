import axios from 'axios';
import { baseConfig } from './axiosConfig';
import { authRefreshToken } from '@/modules/auth/services/auth';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { SecureStorageAdapter } from '@/infrastructure/adapters';
import { parseAxiosError } from '@/utils';

const axiosClient = axios.create(baseConfig);

axiosClient.interceptors.request.use(
	async (config) => {
		const accessToken = await SecureStorageAdapter.getItem('accessToken');

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
				const refreshToken = await SecureStorageAdapter.getItem('refreshToken');

				if (!refreshToken) {
					throw new Error('No refresh token available');
				}

				const data = await authRefreshToken(refreshToken);

				await SecureStorageAdapter.setItem('accessToken', data.accessToken);
				await SecureStorageAdapter.setItem('refreshToken', data.refreshToken);

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
