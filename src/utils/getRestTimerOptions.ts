const MAX_REST_TIME = 5 * 60;
const REST_TIME_INTERVAL = 15;

export const getRestTimerOptions = Array.from(
	{ length: MAX_REST_TIME / REST_TIME_INTERVAL + 1 },
	(_, index) => {
		const seconds = index * REST_TIME_INTERVAL;

		if (seconds === 0) {
			return {
				id: seconds,
				name: 'Off'
			};
		}

		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		return {
			id: seconds,
			name: `${String(minutes).padStart(2, '0')}:${String(
				remainingSeconds
			).padStart(2, '0')}`
		};
	}
);
