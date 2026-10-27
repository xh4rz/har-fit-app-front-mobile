import { create } from 'zustand';
import { authLogin, authRegister } from '../services/auth';

import { SecureStorageAdapter } from '@/infrastructure/adapters';
import {
	AuthLoginRequest,
	AuthRegisterRequest,
	AuthResponse,
	User
} from '@/infrastructure/interfaces';

export interface AuthStoreState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	login: (data: AuthLoginRequest) => Promise<AuthResponse>;
	register: (data: AuthRegisterRequest) => Promise<AuthResponse>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set, get) => ({
	isAuthenticated: false,
	user: null,
	loading: false,
	login: async (data) => {
		set({ loading: true });
		try {
			const resp = await authLogin(data);

			await SecureStorageAdapter.setItem('accessToken', resp.accessToken);
			await SecureStorageAdapter.setItem('refreshToken', resp.refreshToken);
			set({ isAuthenticated: true, user: resp.user });
			return resp;
		} catch (error) {
			throw error;
		} finally {
			set({ loading: false });
		}
	},
	register: async (data) => {
		set({ loading: true });
		try {
			const resp = await authRegister(data);
			await SecureStorageAdapter.setItem('accessToken', resp.accessToken);
			await SecureStorageAdapter.setItem('refreshToken', resp.refreshToken);
			set({ isAuthenticated: true, user: resp.user });
			return resp;
		} catch (error) {
			throw error;
		} finally {
			set({ loading: false });
		}
	},
	logout: async () => {
		await SecureStorageAdapter.removeItem('accessToken');
		await SecureStorageAdapter.removeItem('refreshToken');
		set({ isAuthenticated: false, user: null });
	}
}));
