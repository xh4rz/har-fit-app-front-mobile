import { cloneElement, type ReactElement } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { Text } from '../Text';
import { Loading } from '../Loading';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconProps } from 'phosphor-react-native';

const buttonVariants = cva(
	'flex-row items-center justify-center gap-2 rounded-lg p-2',
	{
		variants: {
			variant: {
				primary: 'bg-primary',
				secondary: 'bg-secondary',
				outline: 'border border-secondary bg-transparent',
				error: 'bg-destructive',
				icon: 'bg-transparent'
			},
			size: {
				xs: 'min-h-6',
				sm: 'min-h-9',
				md: 'min-h-10',
				lg: 'min-h-12',
				xl: 'min-h-14'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	}
);

const textVariants = cva('font-semibold', {
	variants: {
		variant: {
			primary: 'text-white',
			secondary: 'text-white',
			outline: 'text-secondary',
			error: 'text-white',
			icon: 'text-foreground'
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
		icon?: ReactElement<IconProps>;
		iconLeft?: ReactElement<IconProps>;
		iconRight?: ReactElement<IconProps>;
		loading?: boolean;
		fullWidth?: boolean;
	};

export const Button = ({
	title,
	icon,
	iconLeft,
	iconRight,
	fullWidth = true,
	loading = false,
	size,
	variant,
	className,
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
				fullWidth && !icon ? 'w-full' : 'self-start',
				isDisabled && 'opacity-60',
				className
			)}
			disabled={isDisabled}
			{...props}
		>
			{loading ? (
				<Loading size="small" className="text-white" />
			) : icon ? (
				renderIcon(icon)
			) : (
				<>
					{iconLeft && renderIcon(iconLeft)}

					{title && (
						<Text
							numberOfLines={1}
							size="inherit"
							className={cn(textVariants({ variant, size }))}
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
