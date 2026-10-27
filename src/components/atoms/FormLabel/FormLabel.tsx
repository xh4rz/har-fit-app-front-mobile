import { Text } from '../Text';
import { TextInputVariant } from '../TextInput';
import { cn } from '@/utils';

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
	const labelClassName = cn(
		variant === 'line'
			? 'text-sm'
			: 'absolute z-10 top-2 left-4 text-xs font-medium',
		{
			'text-destructive': hasError,
			'text-muted-foreground': !hasError && disabled,
			'text-foreground': !hasError && !disabled
		}
	);

	const requiredClassName = hasError ? 'text-destructive' : 'text-secondary';

	return (
		<Text className={labelClassName}>
			{label}
			{required && <Text className={requiredClassName}>{' *'}</Text>}
		</Text>
	);
};
