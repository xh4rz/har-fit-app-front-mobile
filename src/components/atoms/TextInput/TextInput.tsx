import { forwardRef } from 'react';
import {
	TextInput as RNTextInput,
	type TextInputProps as RNTextInputProps
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { useThemeColors } from '@/hooks';

const textInputVariants = cva(
	'w-full bg-transparent dark:bg-input text-foreground border-input focus:border-ring',
	{
		variants: {
			variant: {
				outlined: 'min-h-16 border rounded-xl px-4 pt-6 pb-2',
				line: 'border-b pb-2'
			},
			disabled: {
				true: 'opacity-60',
				false: 'opacity-100'
			}
		},
		defaultVariants: {
			variant: 'outlined',
			disabled: false
		}
	}
);

export type TextInputVariant = NonNullable<
	VariantProps<typeof textInputVariants>['variant']
>;

type TextInputProps = RNTextInputProps &
	VariantProps<typeof textInputVariants> & {
		className?: string;
		hasError?: boolean;
	};

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
	(
		{
			variant = 'outlined',
			disabled = false,
			hasError = false,
			className,
			editable,
			...props
		},
		ref
	) => {
		const colors = useThemeColors();

		return (
			<RNTextInput
				{...props}
				ref={ref}
				editable={disabled ? false : editable}
				className={cn(
					textInputVariants({ variant, disabled }),
					hasError &&
						(variant === 'line'
							? 'border-destructive focus:border-b-2 focus:border-destructive-focused'
							: 'border-destructive focus:border-2 focus:border-destructive-focused focus:bg-destructive-focused-background dark:focus:bg-destructive-focused-background'),
					className
				)}
				placeholderTextColor={colors.mutedForeground}
			/>
		);
	}
);

TextInput.displayName = 'ThemedTextInput';
