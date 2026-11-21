import { cva } from 'class-variance-authority';
import { View } from 'react-native';
import { Text } from '../Text';
import { TextInputVariant } from '../TextInput';

const labelVariants = cva('', {
	variants: {
		variant: {
			line: 'text-sm',
			outlined: 'text-xs font-medium'
		},
		state: {
			error: 'text-destructive',
			disabled: 'text-muted-foreground',
			default: 'text-foreground'
		}
	},
	defaultVariants: {
		variant: 'outlined',
		state: 'default'
	}
});

interface FormLabelProps {
	label: string;
	required: boolean;
	hasError: boolean;
	variant: TextInputVariant;
	disabled?: boolean;
}

export const FormLabel = ({
	label,
	required,
	hasError,
	variant,
	disabled = false
}: FormLabelProps) => {
	const state = hasError ? 'error' : disabled ? 'disabled' : 'default';
	const requiredClassName = hasError ? 'text-destructive' : 'text-secondary';

	return (
		<View
			className={
				variant === 'line'
					? 'flex-row items-start'
					: 'absolute top-2 left-4 flex-row items-start'
			}
		>
			<Text className={labelVariants({ variant, state })}>{label}</Text>
			{required && (
				<Text
					className={`text-lg leading-none self-start ml-1 ${requiredClassName}`}
				>
					*
				</Text>
			)}
		</View>
	);
};
