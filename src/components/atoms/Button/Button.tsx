import { cloneElement, type ReactElement } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconProps } from 'phosphor-react-native';
import { Text } from '../Text';
import { Loading } from '../Loading';
import { cn } from '@/utils';

const buttonVariants = cva(
	'flex-row items-center justify-center gap-1.5 rounded-lg border border-transparent px-2.5 active:opacity-60',
	{
		variants: {
			variant: {
				primary: 'bg-primary',
				outline: 'border-border',
				secondary: 'bg-secondary',
				ghost: 'bg-transparent',
				destructive: 'bg-destructive',
				link: 'bg-transparent'
			},
			size: {
				xs: 'h-6',
				sm: 'h-9',
				md: 'h-10',
				lg: 'h-12',
				xl: 'h-14'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	}
);

const textVariants = cva('font-medium', {
	variants: {
		variant: {
			primary: 'text-foreground',
			outline: 'text-foreground',
			secondary: 'text-foreground',
			ghost: 'text-foreground',
			destructive: 'text-foreground',
			link: 'text-primary underline'
		},
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl'
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md'
	}
});

type ButtonProps = Omit<PressableProps, 'children'> &
	VariantProps<typeof buttonVariants> & {
		title?: string;
		iconLeft?: ReactElement<IconProps>;
		iconRight?: ReactElement<IconProps>;
		loading?: boolean;
		fullWidth?: boolean;
		textClassName?: string;
	};

export const Button = ({
	title,
	iconLeft,
	iconRight,
	fullWidth = true,
	loading = false,
	size,
	variant,
	className,
	textClassName,
	disabled,
	...props
}: ButtonProps) => {
	const isDisabled = disabled || loading;

	const renderIcon = (element: ReactElement<IconProps>) =>
		cloneElement(element, {
			color: element.props.color ?? 'white'
		});

	return (
		<Pressable
			className={cn(
				buttonVariants({ variant, size }),
				fullWidth ? 'w-full' : 'self-start',
				isDisabled && 'opacity-60',
				className
			)}
			disabled={isDisabled}
			accessibilityRole="button"
			{...props}
		>
			{loading ? (
				<Loading size="small" className="text-white" />
			) : (
				<>
					{iconLeft && renderIcon(iconLeft)}

					{title && (
						<Text
							numberOfLines={1}
							size="inherit"
							className={cn(textVariants({ variant, size }), textClassName)}
						>
							{title}
						</Text>
					)}

					{iconRight && renderIcon(iconRight)}
				</>
			)}
		</Pressable>
	);
};
