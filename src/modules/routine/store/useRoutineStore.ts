import { create } from 'zustand';
import { RoutineExercise } from '../types/exerciseRoutine';

export interface RoutineStoreState {
	title: string;
	isSelecting: boolean;
	exercises: RoutineExercise[];
	selectedExercises: RoutineExercise[];
	setIsSelecting: (value: boolean) => void;
	setTitle: (title: string) => void;
	setExercises: (exercises: RoutineExercise[]) => void;
	setSelectedExercises: (exercises: RoutineExercise[]) => void;
	toggleExercise: (exercise: RoutineExercise) => void;
	clearRoutine: () => void;
	hasExercises: () => boolean;
	isSelected: (id: string) => boolean;
}

export const useRoutineStore = create<RoutineStoreState>((set, get) => ({
	title: '',
	isSelecting: false,
	exercises: [],
	selectedExercises: [],
	setIsSelecting: (value) => set({ isSelecting: value }),
	setTitle: (title) => set({ title }),
	setExercises: (exercises) => set(() => ({ exercises })),
	setSelectedExercises: (exercises) => set({ selectedExercises: exercises }),
	toggleExercise: (item) =>
		set((state) => {
			const exists = state.selectedExercises.some((e) => e.id === item.id);

			return {
				selectedExercises: exists
					? state.selectedExercises.filter((e) => e.id !== item.id)
					: [...state.selectedExercises, item]
			};
		}),
	clearRoutine: () =>
		set({
			title: '',
			isSelecting: false,
			exercises: [],
			selectedExercises: []
		}),
	hasExercises: () => get().exercises.length > 0,
	isSelected: (id) => get().selectedExercises.some((e) => e.id === id)
}));
