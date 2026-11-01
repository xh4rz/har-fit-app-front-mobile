import { View } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoContentFit } from 'expo-video';
import { PauseIcon, PlayIcon } from 'phosphor-react-native';
import { IconButton, Video } from '@/components/atoms';

type VideoPlayerProps = {
	url: string;
	autoPlay?: boolean;
	loop?: boolean;
	contentFit?: VideoContentFit;
};

export const VideoPlayer = ({
	url,
	autoPlay = false,
	loop = false,
	contentFit = 'fill'
}: VideoPlayerProps) => {
	const player = useVideoPlayer(url, (player) => {
		player.loop = loop;
		if (autoPlay) player.play();
	});

	const { isPlaying } = useEvent(player, 'playingChange', {
		isPlaying: player.playing
	});

	const handleTogglePlay = () => {
		if (isPlaying) {
			player.pause();
			return;
		}

		const ended = player.duration && player.currentTime >= player.duration;

		if (ended) {
			player.currentTime = 0;
		}

		player.play();
	};

	return (
		<View className="w-full h-full">
			<View pointerEvents="none" className="w-full h-full">
				<Video player={player} contentFit={contentFit} />
			</View>
			<View className="absolute top-5 right-5">
				<IconButton onPress={handleTogglePlay} variant="primary">
					{isPlaying ? (
						<PauseIcon size={18} color="white" />
					) : (
						<PlayIcon size={18} color="white" />
					)}
				</IconButton>
			</View>
		</View>
	);
};
