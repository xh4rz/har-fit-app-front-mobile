import type { ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loading } from '../Loading';
import { cn } from '@/utils';

const iconButtonVariants = cva(
	' items-center justify-center rounded-lg border border-transparent p-0 active:opacity-60',
	{
		variants: {
			variant: {
				primary: 'bg-primary p-1',
				outline: 'border-border p-1',
				secondary: 'bg-secondary p-1',
				ghost: 'bg-transparent p-0',
				destructive: 'bg-destructive-focused-background p-1'
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
