import { Separator } from '@/components/atoms/Separator/Separator';
import { ThemeContext, ThemeName } from '@/context';
import { useThemeColors } from '@/hooks';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const themeOptions: { value: ThemeName; label: string; icon: string }[] = [
	{ value: 'system', label: 'System', icon: 'smartphone' },
	{ value: 'light', label: 'Light', icon: 'sun' },
	{ value: 'dark', label: 'Dark', icon: 'moon' }
];

export default function ThemeScreen() {
	const { selectedTheme, setTheme } = useContext(ThemeContext);
	const themeColors = useThemeColors();

	return (
		<View className="flex-1">
			<Text className="text-muted-foreground my-2 mx-2 font-semibold">
				Select theme:
			</Text>
			{themeOptions.map((option, index) => (
				<View key={option.value}>
					<TouchableOpacity
						onPress={() => setTheme(option.value)}
						className="flex-row items-center p-4"
						style={{
							backgroundColor:
								selectedTheme === option.value
									? themeColors.secondary
									: themeColors.card
						}}
					>
						<Feather
							name={option.icon as any}
							size={24}
							color={
								selectedTheme === option.value
									? 'white'
									: themeColors.foreground
							}
						/>
						<Text
							className="ml-4 flex-1"
							style={{
								color:
									selectedTheme === option.value
										? 'white'
										: themeColors.foreground
							}}
						>
							{option.label}
						</Text>
						{selectedTheme === option.value && (
							<Feather name="check" size={24} color="white" />
						)}
					</TouchableOpacity>

					{index !== themeOptions.length - 1 && <Separator />}
				</View>
			))}
		</View>
	);
}
