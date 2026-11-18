import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils';

export const Card = ({ className, ...props }: ViewProps) => (
	<View
		className={cn('rounded-lg bg-card p-4', className)}
		{...props}
	/>
);
