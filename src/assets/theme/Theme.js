import React from 'react';

import { useSelector } from 'react-redux';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const Theme = ({ children }) => {
	const theme = createMuiTheme({
		spacing: 4,
		palette: {
			primary: {
				main: '#f9a825',
			},
			secondary: {
				main: '#424242',
			},
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
