import React from 'react';
import { Checkbox as RNCheckbox } from 'expo-checkbox';
import { cva, VariantProps } from 'class-variance-authority';
import { useThemeColors } from '@/hooks';

const checkboxVariants = cva('', {
	variants: {
		variant: {
			default: '',
			success: ''
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
	isChecked: boolean;
	onChange: (value: boolean) => void;
	className?: string;
}

export const Checkbox = ({
	isChecked,
	onChange,
	variant = 'default',
	className = ''
}: CheckboxProps) => {
	const colors = useThemeColors();

	const checkboxColor = isChecked
		? variant === 'success'
			? '#22C55E'
			: colors.secondary
		: undefined;

	return (
		<RNCheckbox
			value={isChecked}
			onValueChange={onChange}
			color={checkboxColor}
			className={`${checkboxVariants({ variant })} ${className}`}
		/>
	);
};
