import axios from 'axios';
import { baseConfig } from './axiosConfig';
import { parseAxiosError } from '@/utils';

export const axiosAuthClient = axios.create(baseConfig);

axiosAuthClient.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(parseAxiosError(error))
);
