import * as SecureStore from 'expo-secure-store';

export class SecureStorageAdapter {
	static async getItem(key: string): Promise<string | null> {
		try {
			return await SecureStore.getItemAsync(key);
		} catch (error) {
			console.error(`Error getting secure key "${key}":`, error);
			return null;
		}
	}

	static async setItem(key: string, value: string): Promise<void> {
		try {
			await SecureStore.setItemAsync(key, value);
		} catch (error) {
			console.error(`Error setting secure key "${key}":`, error);
		}
	}

	static async removeItem(key: string): Promise<void> {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch (error) {
			console.error(`Error removing secure key "${key}":`, error);
		}
	}
}
