import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRoutineById, getRoutines } from '@/modules/routine/services';
// import { useWorkoutStore } from '@/modules/workout/store/useWorkoutStore';
import { Button, Text } from '@/components/atoms';
import { LoadingView, DeleteModal, RoutineItem } from '@/components/molecules';
// import { useTimer } from '@/hooks';
import { FilePlusIcon } from 'phosphor-react-native';

export const RoutineView = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [selectedRoutineId, setSelectedRoutineId] = useState<string>('');
	const [selectedRoutineTitle, setSelectedRoutineTitle] = useState<string>('');
	const [showModalDeleteRoutine, setShowModalDeleteRoutine] = useState(false);
	const [scrollViewHeight, setScrollViewHeight] = useState(0);
	const [contentHeight, setContentHeight] = useState(0);
	// const routineId = useWorkoutStore((state) => state.routineId);
	// const startedAt = useWorkoutStore((state) => state.startedAt);
	// const finishWorkout = useWorkoutStore((state) => state.finishWorkout);
	// const { formattedTime } = useTimer(startedAt);
	// const hasWorkoutInProgress = !!routineId && !!startedAt;

	const { data: dataRoutines, isPending: isPendingRoutines } = useQuery({
		queryKey: ['routines'],
		queryFn: () => getRoutines()
	});

	const handleEditRoutine = (id: string) => {
		router.push({
			pathname: '/routine/edit/[id]',
			params: { id }
		});
	};

	const handleDeleteRoutine = (id: string, title: string) => {
		setSelectedRoutineId(id);
		setSelectedRoutineTitle(title);
		setShowModalDeleteRoutine(true);
	};

	const handleStartRoutine = (id: string) => {
		// finishWorkout();
		// router.push(`/workout/${id}`);
	};

	const { mutate: deleteRoutine, isPending: isPendingDeleteRoutine } =
		useMutation({
			mutationFn: () => deleteRoutineById(selectedRoutineId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ['routines']
				});
				setShowModalDeleteRoutine(false);
			}
		});

	if (isPendingRoutines) {
		return <LoadingView titleLoading="routines" />;
	}

	return (
		<View className="flex-1 gap-2 p-4">
			<Button
				title="New Routine"
				variant="outline"
				fullWidth={false}
				onPress={() => router.push('/routine/create')}
				iconLeft={<FilePlusIcon />}
			/>

			{dataRoutines?.length !== 0 && (
				<>
					<Text className="font-bold text-lg text-secondary">
						Routines: {dataRoutines?.length}
					</Text>

					<ScrollView
						className="flex-1"
						onLayout={({ nativeEvent }) =>
							setScrollViewHeight(nativeEvent.layout.height)
						}
						onContentSizeChange={(_, height) => setContentHeight(height)}
						contentContainerStyle={{
							gap: 16,
							paddingRight: contentHeight > scrollViewHeight ? 16 : 0
						}}
					>
						{dataRoutines?.map((routine) => {
							// const isActive = routine.id === routineId;
							// const isStartDisabled = hasWorkoutInProgress && !isActive;

							return (
								<RoutineItem
									key={routine.id}
									routine={routine}
									isActive={false}
									isStartDisabled={false}
									timer={''}
									onEdit={() => handleEditRoutine(routine.id)}
									onDelete={() =>
										handleDeleteRoutine(routine.id, routine.title)
									}
									onStart={() => handleStartRoutine(routine.id)}
								/>
							);
						})}
					</ScrollView>
				</>
			)}

			<DeleteModal
				title={`Delete '${selectedRoutineTitle}' Routine`}
				description="Are you sure you want to delete this routine?"
				confirmLabel="Delete Routine"
				visible={showModalDeleteRoutine}
				setVisible={setShowModalDeleteRoutine}
				onDelete={deleteRoutine}
				loading={isPendingDeleteRoutine}
			/>
		</View>
	);
};
