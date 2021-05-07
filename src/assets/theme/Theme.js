import React from 'react';

import { useSelector } from 'react-redux';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const Theme = ({ children }) => {
	const theme = createMuiTheme({
		spacing: 4,
		palette: {
			primary: {
				main: '#3f51b5',
			},
			secondary: {
				main: '#fafafa',
			},
			text: {
				primary: '#0C0C0C',
			},
			background: {
				// paper: '#e8e8e8',
				paper: '#fafafa',
			},
			divider: '#b6b6b6',
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
