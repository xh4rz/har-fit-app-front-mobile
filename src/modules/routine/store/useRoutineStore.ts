import { create } from 'zustand';
import { RoutineExercise } from '@/infrastructure/interfaces';

export interface RoutineStoreState {
	title: string;
	isSelecting: boolean;
	exercises: RoutineExercise[];
	selectedExerciseIds: string[];
	setIsSelecting: (value: boolean) => void;
	setTitle: (title: string) => void;
	setExercises: (exercises: RoutineExercise[]) => void;
	setSelectedExerciseIds: (ids: string[]) => void;
	toggleExercise: (id: string) => void;
	clearRoutine: () => void;
	hasExercises: () => boolean;
	isSelected: (id: string) => boolean;
}

export const useRoutineStore = create<RoutineStoreState>((set, get) => ({
	title: '',
	isSelecting: false,
	exercises: [],
	selectedExerciseIds: [],
	setIsSelecting: (value) => set({ isSelecting: value }),
	setTitle: (title) => set({ title }),
	setExercises: (exercises) => set(() => ({ exercises })),
	setSelectedExerciseIds: (ids) => set({ selectedExerciseIds: ids }),
	toggleExercise: (id) =>
		set((state) => ({
			selectedExerciseIds: state.selectedExerciseIds.includes(id)
				? state.selectedExerciseIds.filter((selectedId) => selectedId !== id)
				: [...state.selectedExerciseIds, id]
		})),
	clearRoutine: () =>
		set({
			title: '',
			isSelecting: false,
			exercises: [],
			selectedExerciseIds: []
		}),
	hasExercises: () => get().exercises.length > 0,
	isSelected: (id) => get().selectedExerciseIds.includes(id)
}));
