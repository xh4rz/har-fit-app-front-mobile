import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const textVariants = cva('', {
	variants: {
		variant: {
			default: 'text-foreground',
			error: 'text-destructive'
		},
		size: {
			default: 'text-base',
			inherit: ''
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

type TextProps = RNTextProps &
	VariantProps<typeof textVariants> & {
		className?: string;
	};

export const Text = ({ variant, size, className, ...props }: TextProps) => {
	return (
		<RNText
			className={cn(textVariants({ variant, size }), className)}
			{...props}
		/>
	);
};
