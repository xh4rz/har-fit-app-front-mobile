import { WorkoutSuccessView } from '@/components/screens';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutSuccessScreen() {
	return (
		<SafeAreaView className="flex-1" edges={['top', 'bottom']}>
			<WorkoutSuccessView />
		</SafeAreaView>
	);
}
