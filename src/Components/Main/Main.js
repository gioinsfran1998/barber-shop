import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import BreadCrumb from '../Breadcrumb/BreadCrumb';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		width: '100%',
		paddingTop: '90px',
		flexGrow: 1,
		padding: theme.spacing(6),
		// backgroundColor: theme.palette.secondary.light,
	},
	backgroundMain: {
		backgroundColor: theme.palette.secondary.light,
		display: 'flex',
		width: '100%',
	},
}));

const Main = ({ children, logged }) => {
	const classes = useStyles();

	return (
		<div className={classes.backgroundMain}>
			<Container maxWidth='lg' className={classes.containerMain}>
				{logged && <BreadCrumb />}

				{children}
			</Container>
		</div>
	);
};

export default Main;
