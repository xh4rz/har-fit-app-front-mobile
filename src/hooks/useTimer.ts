import { useEffect, useState } from 'react';

export const useTimer = (startedAt: number | null) => {
	const calculateTimer = () =>
		startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;

	const [elapsedSeconds, setElapsedSeconds] = useState(calculateTimer);

	const hours = Math.floor(elapsedSeconds / 3600);
	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
	const seconds = elapsedSeconds % 60;

	useEffect(() => {
		if (!startedAt) return;

		const interval = setInterval(() => {
			setElapsedSeconds(calculateTimer());
		}, 1000);

		return () => clearInterval(interval);
	}, [startedAt]);

	const formattedTime =
		hours > 0
			? `${hours}h ${minutes}min ${seconds}s`
			: minutes > 0
				? `${minutes}min ${seconds}s`
				: `${seconds}s`;

	return {
		elapsedSeconds,
		formattedTime
	};
};
