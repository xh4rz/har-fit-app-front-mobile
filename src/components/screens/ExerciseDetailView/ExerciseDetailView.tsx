import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IconButton, Text } from '@/components/atoms';
import { LoadingView } from '@/components/molecules';
import {
	BottomSheetExerciseOptions,
	DeleteExerciseModal,
	ExerciseDetail
} from '@/components/organisms';
import {
	deleteExerciseById,
	getExerciseById
} from '@/modules/exercise/services/exercise';
import { DotsThreeOutlineVerticalIcon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

export const ExerciseDetailView = () => {
	const { id } = useLocalSearchParams<{ id: string; title: string }>();

	const colors = useThemeColors();

	const router = useRouter();

	const navigation = useNavigation();

	const queryClient = useQueryClient();

	const [showModalOptions, setShowModalOptions] = useState(false);

	const [showModalDeleteExercise, setShowModalDeleteExercise] = useState(false);

	const {
		data: exercise,
		isPending,
		isError
	} = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => getExerciseById(id)
	});

	const handleEditExercise = () => {
		router.push({
			pathname: '/exercise/edit/[id]',
			params: { id }
		});
	};

	const handleDeleteExercise = () => {
		setShowModalDeleteExercise(true);
	};

	const { mutate: deleteExercise, isPending: loadingDelete } = useMutation({
		mutationFn: () => deleteExerciseById(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['exercises']
			});
			router.back();
		}
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			title: exercise?.title ?? 'Exercise',
			headerRight: () => (
				<IconButton
					icon={<DotsThreeOutlineVerticalIcon color={colors.primary} />}
					onPress={() => setShowModalOptions(true)}
				/>
			)
		});
	}, [exercise?.title]);

	if (isPending) {
		return <LoadingView titleLoading="details exercise" />;
	}

	if (isError || !exercise) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>An error occurred while loading the exercise details.</Text>
			</View>
		);
	}

	return (
		<View className="flex-1">
			<ExerciseDetail exercise={exercise} />

			<BottomSheetExerciseOptions
				show={showModalOptions}
				setShow={setShowModalOptions}
				onEditExercise={handleEditExercise}
				onDeleteExercise={handleDeleteExercise}
			/>

			<DeleteExerciseModal
				exerciseTitle={exercise.title}
				visible={showModalDeleteExercise}
				setVisible={setShowModalDeleteExercise}
				onDelete={deleteExercise}
				loading={loadingDelete}
			/>
		</View>
	);
};
