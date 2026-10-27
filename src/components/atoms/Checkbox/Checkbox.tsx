import React from 'react';
import { Checkbox as RNCheckbox } from 'expo-checkbox';
import { useThemeColors } from '@/hooks';

interface CheckboxProps {
	isChecked: boolean;
	onChange: (value: boolean) => void;
	className?: string;
}

export const Checkbox = ({
	isChecked,
	onChange,
	className = ''
}: CheckboxProps) => {
	const colors = useThemeColors();

	return (
		<RNCheckbox
			value={isChecked}
			onValueChange={onChange}
			color={isChecked ? colors.primary : undefined}
			className={`${className}`}
		/>
	);
};
