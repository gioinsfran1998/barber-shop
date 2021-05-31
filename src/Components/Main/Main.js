import React from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import Layaout from '../Layaout/Layaout';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		minHeight: '100vh',
		display: 'flex',
	},
	containerMain: {
		width: '100%',
		paddingTop: '200px',
		flexGrow: 1,
		display: 'flex',
		// marginLeft: '240px',
		// padding: theme.spacing(6),
		// backgroundColor: theme.palette.secondary.light,
	},
	backgroundMain: {
		backgroundColor: '#fafafa',
		width: '100%',
		paddingTop: '80px',
		padding: theme.spacing(6),
	},
}));

const Main = ({ children, logged }) => {
	const classes = useStyles();
	const user = useSelector((state) => state.user.user);
	const showLayout = useSelector((store) => store.enviroment.showLayout);
	return (
		<div className={classes.root}>
			{user && <Layaout />}

			{showLayout ? (
				<div className={classes.backgroundMain}>
					<Container maxWidth='lg'>
						{showLayout && <BreadCrumb />}
						{children}
					</Container>
				</div>
			) : (
				<>{children}</>
			)}
		</div>
	);
};

export default Main;
