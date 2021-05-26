import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import Layaout from '../Layaout/Layaout';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		width: '100%',
		paddingTop: '90px',
		flexGrow: 1,
		padding: theme.spacing(6),
		// backgroundColor: theme.palette.secondary.light,
	},
	backgroundMain: {
		backgroundColor: '#fafafa',
		display: 'flex',
		width: '100%',
	},
}));

const Main = ({ children, logged }) => {
	const classes = useStyles();
	const user = useSelector((state) => state.user.user);
	// const showLayout = useSelector((store) => store.enviroment.showLayout);
	return (
		<>
			{user && <Layaout />}

			<div className={classes.backgroundMain}>
				<Container maxWidth='lg' className={classes.containerMain}>
					{logged && <BreadCrumb />}

					{children}
				</Container>
			</div>
		</>
	);
};

export default Main;
