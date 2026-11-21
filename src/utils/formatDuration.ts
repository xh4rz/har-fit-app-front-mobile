export const formatDuration = (duration: number) => {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = duration % 60;

	if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
	if (minutes > 0) return `${minutes}min ${seconds}s`;
	return `${seconds}s`;
};
