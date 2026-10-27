import { ActivityIndicator } from 'react-native';
import { cn } from '@/utils';

interface LoadingProps {
	size?: number | 'large' | 'small';
	className?: string;
}

export const Loading = ({ size = 'large', className }: LoadingProps) => {
	return (
		<ActivityIndicator
			size={size}
			className={cn('text-foreground', className)}
		/>
	);
};
