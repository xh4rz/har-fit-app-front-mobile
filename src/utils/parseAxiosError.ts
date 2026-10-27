import { isAxiosError } from 'axios';
import { ApiError } from '@/infrastructure/interfaces';

export const parseAxiosError = (error: unknown): ApiError => {
	if (isAxiosError<ApiError>(error)) {
		if (error.response) {
			const apiError: ApiError = {
				message: error.response.data?.message ?? 'Request failed',
				error: error.response.data?.error ?? error.message,
				statusCode: error.response.status
			};

			console.error('API error response:', apiError);
			return apiError;
		}

		if (error.code === 'ERR_NETWORK') {
			const networkError: ApiError = {
				message: 'Network error. Check your connection',
				error: 'Network Error',
				statusCode: 0
			};

			console.error('Network error:', networkError);
			return networkError;
		}
	}

	const unknownError: ApiError = {
		message: 'Unknown error. Check your api',
		error: 'Unknown Error',
		statusCode: 500
	};

	console.error('Unknown error:', unknownError);
	return unknownError;
};
