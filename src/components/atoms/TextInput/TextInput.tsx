import { forwardRef } from 'react';
import {
	TextInput as RNTextInput,
	type TextInputProps as RNTextInputProps
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { useThemeColors } from '@/hooks';

const textInputVariants = cva('w-full bg-transparent dark:bg-input', {
	variants: {
		variant: {
			outlined: 'min-h-16 border rounded-xl px-4 pt-6 pb-2',
			line: 'border-b pb-2'
		},
		state: {
			default: 'border-input',
			focused: 'border-ring',
			error: 'border-destructive',
			errorFocused:
				'border-2 border-destructive-focused bg-destructive-focused-background dark:bg-destructive-focused-background'
		},
		disabled: {
			true: 'opacity-60',
			false: 'opacity-100'
		}
	},
	defaultVariants: {
		variant: 'outlined',
		state: 'default',
		disabled: false
	}
});

export type TextInputVariant = NonNullable<
	VariantProps<typeof textInputVariants>['variant']
>;

export type TextInputState = NonNullable<
	VariantProps<typeof textInputVariants>['state']
>;

type TextInputProps = RNTextInputProps &
	VariantProps<typeof textInputVariants> & {
		className?: string;
	};

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
	(
		{
			variant = 'outlined',
			state = 'default',
			disabled = false,
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
					textInputVariants({ variant, state, disabled }),
					'text-foreground',
					className
				)}
				placeholderTextColor={colors.mutedForeground}
			/>
		);
	}
);

TextInput.displayName = 'ThemedTextInput';
