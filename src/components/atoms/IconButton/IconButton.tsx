import { ReactElement, cloneElement } from 'react';
import {
	ActivityIndicator,
	TouchableOpacity,
	TouchableOpacityProps
} from 'react-native';
import { IconProps } from 'phosphor-react-native';

interface IconButtonProps extends TouchableOpacityProps {
	icon: ReactElement<IconProps>;
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	loading?: boolean;
}

const sizes = {
	xs: 'w-6 h-6',
	sm: 'w-8 h-8',
	md: 'w-10 h-10',
	lg: 'w-12 h-12',
	xl: 'w-14 h-14'
};

const sizesIcon = { xs: 14, sm: 18, md: 24, lg: 28, xl: 32 };

export const IconButton = ({
	icon,
	variant = 'primary',
	size = 'md',
	loading = false,
	className,
	disabled,
	...rest
}: IconButtonProps) => {
	const iconSize = sizesIcon[size];
	const buttonSizeClass = sizes[size];
	const buttonOpacityClass = disabled || loading ? 'opacity-60' : 'opacity-100';

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			className={`
				items-center justify-center rounded-full
			 	${buttonSizeClass}
        		${buttonOpacityClass}
        		${className ?? ''}
			`}
			disabled={disabled || loading}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				cloneElement(icon, {
					size: icon.props.size ?? iconSize,
					color: icon.props.color ?? 'white'
				})
			)}
		</TouchableOpacity>
	);
};
