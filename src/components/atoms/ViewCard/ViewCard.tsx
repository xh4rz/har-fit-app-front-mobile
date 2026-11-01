import { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils';

interface ViewCardProps extends ViewProps {
	className?: string;
	children: ReactNode;
}

export const ViewCard = ({ className, children, ...props }: ViewCardProps) => {
	return (
		<View
			className={cn(
				'w-full rounded-2xl border border-border bg-card p-4 shadow-sm',
				className
			)}
			{...props}
		>
			{children}
		</View>
	);
};
