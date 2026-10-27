import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text } from '@/components/atoms';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	BottomSheetRoutineOptions,
	DeleteRoutineModal
} from '@/components/organisms';
import { LoadingView, RoutineCard } from '@/components/molecules';
import { deleteRoutineById, getRoutines } from '@/modules/routine/services';

export const RoutineView = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const [selectedRoutineId, setSelectedRoutineId] = useState<string>('');

	const [showModalOptions, setShowModalOptions] = useState(false);

	const [showModalDeleteRoutine, setShowModalDeleteRoutine] = useState(false);

	const { data: routine, isPending } = useQuery({
		queryKey: ['routines'],
		queryFn: () => getRoutines()
	});

	const handleEditRoutine = () => {
		router.push({
			pathname: '/routine/edit/[id]',
			params: { id: selectedRoutineId }
		});
	};

	const handleDeleteRoutine = () => {
		setShowModalDeleteRoutine(true);
	};

	const { mutate: deleteExercise, isPending: loadingDelete } = useMutation({
		mutationFn: () => deleteRoutineById(selectedRoutineId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['routines']
			});
			setShowModalDeleteRoutine(false);
		}
	});

	if (isPending) {
		return <LoadingView titleLoading="routines" />;
	}

	return (
		<View className="gap-4 p-5">
			<Text className="font-bold text-lg">Routines</Text>
			<Button
				title="New Routine"
				bg="bg-zinc-800"
				fullWidth={false}
				onPress={() => router.push('/routine/create')}
				iconLeft={
					<MaterialCommunityIcons name="file-document-plus-outline" size={24} />
				}
			/>

			{routine?.length !== 0 && (
				<>
					<Text className="font-bold text-lg">
						My Routines: {routine?.length}
					</Text>
					{routine?.map((i) => (
						<RoutineCard
							key={i.id}
							routine={i}
							onOptionsPress={(id) => {
								setSelectedRoutineId(id);
								setShowModalOptions(true);
							}}
						/>
					))}
				</>
			)}

			<BottomSheetRoutineOptions
				show={showModalOptions}
				setShow={setShowModalOptions}
				onEditRoutine={handleEditRoutine}
				onDeleteRoutine={handleDeleteRoutine}
			/>

			<DeleteRoutineModal
				visible={showModalDeleteRoutine}
				setVisible={setShowModalDeleteRoutine}
				onDelete={deleteExercise}
				loading={loadingDelete}
			/>
		</View>
	);
};
