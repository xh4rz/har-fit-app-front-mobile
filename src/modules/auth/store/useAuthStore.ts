import { StorageAdapter } from '@/adapters/storage-adapter';
import { User } from '@/infrastructure/interfaces';
import { create } from 'zustand';
import { authLogin, authRegister } from '../services/auth';

export interface AuthStoreState {
	isAuthenticated: boolean;
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (name: string, email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set, get) => ({
	isAuthenticated: false,
	user: null,
	login: async (email: string, password: string) => {
		const resp = await authLogin(email, password);

		if (!resp) {
			set({ isAuthenticated: false, user: null });
			return false;
		}

		await StorageAdapter.setItem('accessToken', resp.accessToken);

		await StorageAdapter.setItem('refreshToken', resp.refreshToken);

		set({
			isAuthenticated: true,
			user: resp.user
		});

		return true;
	},
	register: async (name: string, email: string, password: string) => {
		const resp = await authRegister(name, email, password);

		if (!resp) {
			return false;
		}

		await StorageAdapter.setItem('accessToken', resp.accessToken);

		await StorageAdapter.setItem('refreshToken', resp.refreshToken);

		set({
			isAuthenticated: true,
			user: resp.user
		});

		return true;
	},

	logout: async () => {
		await StorageAdapter.removeItem('accessToken');

		await StorageAdapter.removeItem('refreshToken');

		set({ isAuthenticated: false, user: null });
	}
}));
