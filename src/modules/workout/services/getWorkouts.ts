import axiosClient from '@/api/axiosClient';
import { WorkoutResponse } from '@/infrastructure/interfaces';

export const getWorkouts = async () => {
	try {
		const { data } = await axiosClient.get<WorkoutResponse[]>('/workouts');

		return data;
	} catch (error) {
		throw error;
	}
};
