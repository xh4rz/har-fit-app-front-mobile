import { z } from 'zod';

const coerceNumber = <T extends z.ZodNumber>(schema: T) =>
	z.preprocess((value) => {
		if (value === '' || value === null || value === undefined) {
			return undefined;
		}

		return Number(value);
	}, schema);

const repsSchema = coerceNumber(
	z
		.number({
			message: 'Reps is required'
		})
		.int({ message: 'Reps must be an integer' })
		.min(1, { message: 'Reps must be greater than 0' })
);

const kgSchema = coerceNumber(
	z
		.number({
			message: 'KG is required'
		})
		.min(1, { message: 'KG must be greater than 0' })
);

const createRoutineFormSchema = (isWorkout = false) =>
	z.object({
		title: z
			.string()
			.trim()
			.min(1, { message: 'Title is required' })
			.min(5, { message: 'Title must be at least 5 characters' }),
		description: z
			.string()
			.max(300, 'Description can have a maximum of 300 characters')
			.optional(),
		exercises: z
			.array(
				z.object({
					exerciseId: z.string().uuid({
						message: 'Invalid exercise id'
					}),
					restTimer: z.number().optional(),
					sets: z
						.array(
							z.object({
								set: z.number(),
								reps: repsSchema,
								kg: kgSchema,
								completed: z.boolean()
							})
						)
						.min(isWorkout ? 0 : 1, { message: 'At least 1 set is required' })
				})
			)
			.min(1, { message: 'Add at least one exercise' })
	});

export const routineFormSchema = createRoutineFormSchema();
export const workoutFormSchema = createRoutineFormSchema(true);

export type RoutineFormInput = z.input<typeof routineFormSchema>;
export type RoutineFormOutput = z.output<typeof routineFormSchema>;
