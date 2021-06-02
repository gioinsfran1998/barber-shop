import { Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const getCurrentTime = () => {
	const now = new Date();

	const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
		.map((item) => item.toString().padStart(2, '0'))
		.join(':');

	return time;
};

const Timer = () => {
	const [dateTime, setDateTime] = useState(getCurrentTime());
	useEffect(() => {
		const timer = setInterval(() => setDateTime(getCurrentTime()), 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<Typography variant='h6' style={{ paddingRight: '40px', color: 'white' }}>
				{dateTime}
			</Typography>
		</>
	);
};

export default Timer;
