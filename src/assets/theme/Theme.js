import React from 'react';

import { useSelector } from 'react-redux';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const Theme = ({ children }) => {
	const theme = createMuiTheme({
		spacing: 4,
		palette: {
			primary: {
				main: '#3BC183',
			},
			secondary: {
				main: '#2A2D34',
			},
			text: {
				primary: '#fff',
			},
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
