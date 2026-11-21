import axiosClient from '@/api/axiosClient';
import { WorkoutRequest, WorkoutResponse } from '@/infrastructure/interfaces';

export const postWorkout = async (body: WorkoutRequest) => {
	try {
		const { data } = await axiosClient.post<WorkoutResponse>('/workouts', body);

		return data;
	} catch (error) {
		throw error;
	}
};
