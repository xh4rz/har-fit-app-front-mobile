import axiosClient from '@/api/axiosClient';
import { WorkoutResponse } from '@/infrastructure/interfaces';

export const getWorkoutById = async (id: string) => {
	try {
		const { data } = await axiosClient.get<WorkoutResponse>(`/workouts/${id}`);

		return data;
	} catch (error) {
		throw error;
	}
};
