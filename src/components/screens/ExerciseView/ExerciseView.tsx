import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { BottomSheetSelectList, ExerciseList } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { LoadingView } from '@/components/molecules';
import { getExercises } from '@/modules/exercise/services/exercise';
import { getMuscles } from '@/modules/exercise/services/muscle';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';

export const ExerciseView = () => {
	const router = useRouter();

	const isSelecting = useRoutineStore((state) => state.isSelecting);

	const [showModalEquipment, setShowModalEquipment] = useState(false);

	const [showModalMuscle, setShowModalMuscle] = useState(false);

	const [equipmentId, setEquipmentId] = useState<number>(1);

	const [muscleId, setMuscleId] = useState<number>(1);

	const { data: dataExercises, isPending: isPendingExercises } = useQuery({
		queryKey: ['exercises'],
		queryFn: getExercises
	});

	const { data: dataMuscles, isPending: isPendingMuscles } = useQuery({
		queryKey: ['muscles'],
		queryFn: getMuscles,
		enabled: !isPendingExercises
	});

	const { data: dataEquipments, isPending: isPendingEquipments } = useQuery({
		queryKey: ['equipments'],
		queryFn: getEquipments,
		enabled: !isPendingExercises
	});

	const handlePressExercise = (id: string, title: string) => {
		router.push({
			pathname: '/exercise/[id]',
			params: { id, title }
		});
	};

	const findMuscle = dataMuscles?.find((i) => i.id === muscleId);

	const findEquipment = dataEquipments?.find((i) => i.id === equipmentId);

	if (isPendingExercises) {
		return <LoadingView titleLoading="exercises" />;
	}

	return (
		<View>
			{/* <View className="items-center justify-center py-4">
				<Text className="text-center text-lg font-bold">List Exercises</Text>
			</View> */}

			<View className="flex-row gap-2 p-4">
				<View className="flex-1">
					<Button
						title={findEquipment?.name ?? ''}
						loading={isPendingEquipments}
						variant="secondary"
						onPress={() => setShowModalEquipment(true)}
					/>
				</View>
				<View className="flex-1">
					<Button
						title={findMuscle?.name ?? ''}
						loading={isPendingMuscles}
						variant="secondary"
						onPress={() => setShowModalMuscle(true)}
					/>
				</View>
			</View>

			<ExerciseList
				data={dataExercises}
				onPress={handlePressExercise}
				selectable={isSelecting}
			/>

			<BottomSheetSelectList
				title="Equipments"
				data={dataEquipments}
				show={showModalEquipment}
				setShow={setShowModalEquipment}
				selectedIds={equipmentId ? [equipmentId] : []}
				onChange={(ids) => setEquipmentId(ids[0])}
				imageScale={0.6}
			/>

			<BottomSheetSelectList
				title="Muscles"
				data={dataMuscles}
				show={showModalMuscle}
				setShow={setShowModalMuscle}
				selectedIds={muscleId ? [muscleId] : []}
				onChange={(ids) => setMuscleId(ids[0])}
				imageScale={1.2}
			/>
		</View>
	);
};
