import React from 'react';
import { Text } from '../Text';
import { cn } from '@/utils';

interface AppBrandProps {
	className?: string;
}

export const AppBrand = ({ className }: AppBrandProps) => {
	return (
		<Text
			className={cn('text-4xl text-center font-bold text-secondary', className)}
		>
			HarFit
			<Text size="inherit" className="text-primary">
				App
			</Text>
		</Text>
	);
};
