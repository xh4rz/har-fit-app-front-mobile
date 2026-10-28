import type { ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loading } from '../Loading';
import { cn } from '@/utils';

const iconButtonVariants = cva(
	'items-center justify-center rounded-full border border-transparent p-0 active:opacity-60',
	{
		variants: {
			variant: {
				primary: 'bg-primary',
				outline: 'border-border',
				secondary: 'bg-secondary',
				ghost: 'bg-transparent',
				destructive: 'bg-destructive'
			}
		},
		defaultVariants: {
			variant: 'ghost'
		}
	}
);

type IconButtonProps = Omit<PressableProps, 'children'> &
	VariantProps<typeof iconButtonVariants> & {
		children: ReactNode;
		loading?: boolean;
	};

export const IconButton = ({
	children,
	variant,
	className,
	loading = false,
	disabled,
	...props
}: IconButtonProps) => {
	const isDisabled = disabled || loading;

	return (
		<Pressable
			className={cn(
				iconButtonVariants({ variant }),
				isDisabled && 'opacity-60',
				className
			)}
			disabled={isDisabled}
			accessibilityRole="button"
			{...props}
		>
			{loading ? (
				<Loading size="small" className="text-foreground" />
			) : (
				children
			)}
		</Pressable>
	);
};
