interface RoutineSet {
	set: number;
	reps: number;
	kg: number;
	completed: boolean;
}

interface RoutineExercise {
	exerciseId: string;
	sets: RoutineSet[];
}

export interface RoutineRequest {
	title: string;
	exercises: RoutineExercise[];
}

export interface RoutineResponse {
	id: string;
	title: string;
	exercises: (RoutineExercise & {
		title: string;
		video: string;
		primaryMuscleName: string;
		restTimer: number;
	})[];
}
