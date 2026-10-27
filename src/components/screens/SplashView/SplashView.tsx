import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Loading } from '@/components/atoms';
import { delay } from '@/utils';

export const SplashView = ({ onFinish }: { onFinish: () => void }) => {
	const containerOpacity = useRef(new Animated.Value(1)).current;
	const letters = 'HarFitApp'.split('');
	const letterAnims = useRef(letters.map(() => new Animated.Value(0))).current;

	useEffect(() => {
		const start = async () => {
			await new Promise<void>((resolve) => {
				Animated.stagger(
					80,
					letterAnims.map((anim) =>
						Animated.timing(anim, {
							toValue: 1,
							duration: 1000,
							useNativeDriver: true
						})
					)
				).start(() => resolve());
			});

			await delay(1000);

			Animated.timing(containerOpacity, {
				toValue: 0,
				duration: 600,
				useNativeDriver: true
			}).start(async () => {
				onFinish();
			});
		};

		start();
	}, []);

	return (
		<Animated.View
			style={{ opacity: containerOpacity }}
			className="flex-1 bg-background items-center justify-center"
		>
			<Loading />
			<View className="flex-row">
				{letters.map((char, index) => {
					const anim = letterAnims[index];

					return (
						<Animated.Text
							key={index}
							style={{
								opacity: anim,
								transform: [
									{
										translateY: anim.interpolate({
											inputRange: [0, 1],
											outputRange: [20, 0]
										})
									}
								]
							}}
							className={`text-[50px] font-bold tracking-[2px] ${
								index < 6 ? 'text-primary' : 'text-secondary'
							}`}
						>
							{char}
						</Animated.Text>
					);
				})}
			</View>
		</Animated.View>
	);
};
