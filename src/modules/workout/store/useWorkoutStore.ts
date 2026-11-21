import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { AsyncStorageAdapter } from '@/infrastructure/adapters';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';

interface WorkoutStoreState {
	workout: RoutineFormInput | null;
	startedAt: number | null;
	routineId: string | null;
	setWorkout: (routineId: string, workout: RoutineFormInput) => void;
	startWorkout: () => void;
	clearWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStoreState>()(
	devtools(
		persist(
			(set) => ({
				workout: null,
				startedAt: null,
				routineId: null,
				setWorkout: (routineId, workout) => set({ routineId, workout }),
				startWorkout: () => set({ startedAt: Date.now() }),
				clearWorkout: () =>
					set({
						workout: null,
						startedAt: null,
						routineId: null
					})
			}),
			{
				name: 'routineWorkout',
				storage: createJSONStorage(() => AsyncStorageAdapter)
			}
		),
		{ store: 'useWorkoutStore' }
	)
);
