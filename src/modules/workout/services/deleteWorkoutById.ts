import axiosClient from '@/api/axiosClient';

export const deleteWorkoutById = async (id: string) => {
	try {
		const { data } = await axiosClient.delete(`/workouts/${id}`);

		return data;
	} catch (error) {
		throw error;
	}
};
