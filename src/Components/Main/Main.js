import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import Layaout from '../Layaout/Layaout';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { showLayoutAction } from '../../redux/enviroment';

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
	const dispatch = useDispatch();

	const showLayout = useSelector((store) => store.enviroment.showLayout);
	const [show, setShow] = useState(true);

	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		if (pathname === '/monitor') {
			dispatch(showLayoutAction(false));
			setShow(false);

			return;
		}

		if (pathname !== '/monitor') {
			dispatch(showLayoutAction(true));
			setShow(true);
			return;
		}
	}, [showLayout]);

	return (
		<div className={classes.root}>
			{showLayout && <Layaout />}

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
