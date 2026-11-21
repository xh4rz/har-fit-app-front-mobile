interface WorkoutSet {
	set: number;
	reps: number;
	kg: number;
	completed: boolean;
}

interface WorkoutExercise {
	exerciseId: string;
	sets: WorkoutSet[];
}

export interface WorkoutRequest {
	title: string;
	duration: number;
	description?: string;
	exercises: WorkoutExercise[];
}

export interface WorkoutResponse {
	id: string;
	title: string;
	duration: number;
	description: string | null;
	volume: number;
	sets: number;
	createdAt: Date;
	updatedAt: Date;
	exercises: (WorkoutExercise & {
		title: string;
		video: string;
		primaryMuscleName: string;
		restTimer: number;
	})[];
}
