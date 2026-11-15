export const formatRestTime = (seconds: number): string => {
	if (seconds === 0) return 'Off';
	if (seconds < 60) return `${seconds}s`;

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	if (remainingSeconds === 0) return `${minutes}m`;

	return `${minutes}m ${remainingSeconds}s`;
};
