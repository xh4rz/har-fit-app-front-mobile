import axiosClient from '@/api/axiosClient';
import { WorkoutRequest, WorkoutResponse } from '@/infrastructure/interfaces';

export const patchWorkoutById = async (id: string, body: WorkoutRequest) => {
	try {
		const { data } = await axiosClient.patch<WorkoutResponse>(
			`/workouts/${id}`,
			body
		);

		return data;
	} catch (error) {
		throw error;
	}
};
