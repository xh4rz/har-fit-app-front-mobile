import { Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfileScreen() {
	const { logout } = useAuthStore();

	const queryClient = useQueryClient();

	const handleLogout = async () => {
		await logout();
		queryClient.clear();
	};

	return (
		<View className="flex-1">
			<View className="flex-1 justify-center items-center px-5 gap-4">
				<Text className="text-3 font-bold text-primary-theme text-4xl">
					Bienvenido al perfil
				</Text>

				<TouchableOpacity
					onPress={handleLogout}
					className="bg-red-500 p-2 rounded-md"
				>
					<Text className="text-white">Cerrar sesión</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
