import React, { useState, useEffect } from 'react';

import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLayoutAction } from '../../redux/enviroment';
import { format } from 'date-fns';
import {
	AppBar,
	Avatar,
	Box,
	Container,
	CssBaseline,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	Toolbar,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		// display: 'flex',
		height: '100%',
		width: '100%',
		background: '#0f0c29',
		background:
			'-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)' /* Chrome 10-25, Safari 5.1-6 */,
		background:
			'linear-gradient(to right, #24243e, #302b63, #0f0c29)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
	},
	paperContainer: {
		padding: theme.spacing(6),
		backgroundColor: 'transparent',
	},
	boxPaperContainer: {
		display: 'flex',
	},
	paperImgContainer: {
		margin: '12px',
		maxWidth: '300px',
		width: '100%',
		height: '250px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	button: {
		width: '110px',
		marginRight: '15px',
	},
	boxButton: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
	},
	cardImageContainer: {
		margin: '10px',
		borderRadius: '50%',
		borderColor: theme.palette.divider,
		border: '2px solid',
		width: '150px',
		height: '150px',
	},
	input: {
		display: 'none',
	},
	imagePhoto: {
		position: 'absolute',
		opacity: '0.4',
	},
	boxContainer: {
		marginLeft: '5px',
		flexGrow: 1,
	},
	iconInfo: {
		color: 'black',
		width: '48px',
		height: '48px',
		backgroundColor: 'yellow',
	},
	iconInfo: {
		color: 'black',
		width: '48px',
		height: '48px',
		backgroundColor: 'yellow',
	},
	checkInfo: {
		color: 'black',
		width: '48px',
		height: '48px',
		backgroundColor: 'red',
	},
	avatarContainer: {
		// padding: '20px',
		margin: '10px',
	},
}));

// Filter state == 2
const infoTiquets = [
	{
		id: '345334',
		name: 'Juan Roman',
		service: 'Corte',
		barber: 'Jorge Gauto',
		state: 1,
	},
	{
		id: '415234',
		name: 'Victor Rolon',
		service: 'Corte y Ceja',
		barber: 'Miguel Lopez',
		state: 1,
	},
	{
		id: '345334',
		name: 'Juan Roman',
		service: 'Corte',
		barber: 'Jorge Gauto',
		state: 0,
	},
	{
		id: '415234',
		name: 'Victor Rolon',
		service: 'Corte y Ceja',
		barber: 'Miguel Lopez',
		state: 2,
	},
	{
		id: '145234',
		name: 'Walter Pereira',
		service: 'Ceja',
		barber: 'Jonas Guiterres',
		state: 1,
	},
	{
		id: '012332',
		name: 'Diego Gimenez',
		service: 'Corte',
		barber: 'Alberto Martinez',
		state: 0,
	},
	{
		id: 'AD2331',
		name: 'Mateus Aquino',
		service: 'Barba',
		barber: 'Alberto Martinez',
		state: 0,
	},
	{
		id: '0FD132',
		name: 'Martin Gonzalez',
		service: 'Lavado',
		barber: 'Alberto Martinez',
		state: 0,
	},
	{
		id: 'AD2331',
		name: 'Mateus Aquino',
		service: 'Barba',
		barber: 'Alberto Martinez',
		state: 0,
	},
	{
		id: '0FD132',
		name: 'Martin Gonzalez',
		service: 'Lavado',
		barber: 'Alberto Martinez',
		state: 0,
	},
	{
		id: '0FD132',
		name: 'Martin Gonzalez',
		service: 'Lavado',
		barber: 'Alberto Martinez',
		state: 0,
	},
];

const getCurrentTime = () => {
	const now = new Date();

	const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
		.map((item) => item.toString().padStart(2, '0'))
		.join(':');

	return time;
};

const Monitor = () => {
	const [dateTime, setDateTime] = useState(getCurrentTime());
	const [showTime, setShowTime] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const existState2 = infoTiquets.filter((ticket) => {
		return ticket.state === 2;
	});

	useEffect(() => {
		const timer = setInterval(() => setDateTime(getCurrentTime()), 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className={classes.container}>
			<AppBar position='static'>
				<Toolbar style={{ justifyContent: 'space-between' }}>
					<IconButton
						aria-label='close'
						onClick={() => {
							console.log(history);
							history.push('/');
							dispatch(showLayoutAction(true));
						}}
					>
						<ArrowBackIosIcon style={{ color: 'white' }} />
					</IconButton>

					<Typography variant='h6' style={{ paddingRight: '40px' }}>
						{dateTime}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					marginTop: '30px',
				}}
			>
				<Box
					style={{
						background: '#3F51B5',
						width: '45%',
						minWidth: '550px',
						height: '400px',
						borderRadius: '0 10px 10px 0 ',
						padding: '20px',
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
					}}
				>
					{infoTiquets.map(({ name, id, barber, state, service }) => {
						return (
							state === 2 && (
								<Paper
									style={{
										margin: '10px',
										backgroundColor: 'green',
										minWidth: '200px',
										maxWidth: '300px',
										width: '100%',
										height: '300px',
										padding: '5px',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Typography variant='h3' color='initial'>
										N° {id}
									</Typography>
									<Typography variant='h6' color='initial'>
										Cliente: {name}
									</Typography>
									<Typography variant='h6' color='initial'>
										Barbero: {barber}
									</Typography>
									<Typography variant='h6' color='initial'>
										Servicio: {service}
									</Typography>
								</Paper>
							)
						);
					})}
				</Box>
				<Box
					style={{
						// background: '#3F51B5',
						width: '45%',
						height: '400px',
						minWidth: '550px',
						// padding: '20px',
					}}
				>
					<Box
						style={{
							backgroundColor: '#3F51B5',
							borderRadius: '10px 0 0 10px ',
							padding: '5px',
						}}
					>
						<Typography
							variant='h4'
							color='initial'
							style={{ textAlign: 'center', color: 'white' }}
						>
							Proximas llamadas
						</Typography>
					</Box>

					<Box
						style={{
							// background: '#3F51B5',

							paddingTop: '10px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							alignItems: 'center',
							// borderRadius: '0 10px 10px 0 ',
						}}
					>
						{infoTiquets.map(({ name, state, id }) => {
							return state === 1 ? (
								<Paper
									// variant='outlined'
									style={{
										backgroundColor: 'yellow',

										margin: '10px',
										maxWidth: '500px',
										width: '100%',
										display: 'flex',
										padding: '10px',
										height: '90px',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Box className={classes.boxContainer}>
										<Typography variant='h5' color='initial'>
											{id}
										</Typography>
										<Box display='flex' flexWrap='wrap' alignItems='center'>
											<Typography variant='h6' color='initial'>
												Barbero: {name}
											</Typography>
										</Box>
									</Box>
									<Avatar className={classes.avatarContainer}>
										<InfoIcon classes={{ root: classes.iconInfo }} />
									</Avatar>
								</Paper>
							) : null;
						})}
					</Box>
				</Box>
			</Box>

			<Box
				style={{
					// background: '#3F51B5',
					width: '100%',
					height: '100%',
					marginTop: '30px',

					// borderRadius: '0 10px 10px 0 ',
				}}
			>
				<Box
					style={{
						backgroundColor: '#3F51B5',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start',
						padding: '5px',
						paddingLeft: '20px',
					}}
				>
					<Typography
						variant='h4'
						color='initial'
						style={{ textAlign: 'center', color: 'white' }}
					>
						Ultimas llamadas
					</Typography>
				</Box>

				<Box
					style={{
						padding: '20px',
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					{infoTiquets.map(({ name, state, id }) => {
						return state === 0 ? (
							<Paper
								// variant='outlined'
								style={{
									backgroundColor: 'red',

									margin: '10px',
									maxWidth: '350px',
									width: '100%',
									display: 'flex',
									padding: '10px',
									height: '90px',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Box className={classes.boxContainer}>
									<Typography variant='h5' color='initial'>
										{id}
									</Typography>
									<Box display='flex' flexWrap='wrap' alignItems='center'>
										<Typography variant='h6' color='initial'>
											Barbero: {name}
										</Typography>
									</Box>
								</Box>
								<Avatar className={classes.avatarContainer}>
									<CheckCircleIcon classes={{ root: classes.checkInfo }} />
								</Avatar>
							</Paper>
						) : null;
					})}
				</Box>
			</Box>
		</div>

		// <div className={classes.container}>
		// 	<Container maxWidth='xl'>
		// 		<Grid container xs={12}>
		// 			<IconButton
		// 				aria-label='close'
		// 				onClick={() => {
		// 					console.log(history);
		// 					history.push('/');
		// 					dispatch(showLayoutAction(true));
		// 				}}
		// 			>
		// 				<ArrowBackIosIcon style={{ color: 'white' }} />
		// 			</IconButton>
		// 		</Grid>
		// 		<Grid container xs={12}>
		// 			<Grid item xs={3}>
		// 				{/* <Box
		// 					style={{
		// 						padding: '5px',
		// 						width: '100%',
		// 						// height: '350px',
		// 						// backgroundColor: '#8c8c8c',
		// 						display: 'flex',
		// 						flexDirection: 'column',
		// 					}}
		// 				> */}
		// 				{isEmpty(existState2) && (
		// 					<Paper
		// 						style={{
		// 							backgroundColor: 'orange',
		// 							width: '100%',
		// 							height: '300px',
		// 							padding: '5px',
		// 							display: 'flex',
		// 							flexDirection: 'column',
		// 							justifyContent: 'center',
		// 							alignItems: 'center',
		// 						}}
		// 					>
		// 						<Typography variant='h3' color='initial'>
		// 							Sin llamada Actual
		// 						</Typography>
		// 					</Paper>
		// 				)}

		// 				{infoTiquets.map(({ name, id, barber, state, service }) => {
		// 					return (
		// 						state === 2 && (
		// 							<Paper
		// 								style={{
		// 									backgroundColor: 'green',
		// 									width: '100%',
		// 									height: '300px',
		// 									padding: '5px',
		// 									display: 'flex',
		// 									flexDirection: 'column',
		// 									justifyContent: 'center',
		// 									alignItems: 'center',
		// 								}}
		// 							>
		// 								<Typography variant='h2' color='initial'>
		// 									N° {id}
		// 								</Typography>
		// 								<Typography variant='h4' color='initial'>
		// 									Cliente: {name}
		// 								</Typography>
		// 								<Typography variant='h4' color='initial'>
		// 									Barbero: {barber}
		// 								</Typography>
		// 								<Typography variant='h4' color='initial'>
		// 									Servicio: {service}
		// 								</Typography>
		// 							</Paper>
		// 						)
		// 					);
		// 				})}
		// 				{/* </Box> */}
		// 			</Grid>
		// 		</Grid>
		// 		<Grid item xs={6}>
		// 			<Typography
		// 				variant='h4'
		// 				color='initial'
		// 				style={{ textAlign: 'center', color: 'white' }}
		// 			>
		// 				Proximas llamadas
		// 			</Typography>

		// 			{infoTiquets.map(({ name, state, id }) => {
		// 				return state === 1 ? (
		// 					// <Paper
		// 					// 	// variant='outlined'
		// 					// 	style={{
		// 					// 		backgroundColor: 'yellow',

		// 					// 		margin: '10px',
		// 					// 		// maxWidth: '500px',
		// 					// 		width: '100%',
		// 					// 		display: 'flex',
		// 					// 		padding: '10px',
		// 					// 		height: '90px',
		// 					// 		justifyContent: 'center',
		// 					// 		alignItems: 'center',
		// 					// 	}}
		// 					// >
		// 					<>
		// 						<Box className={classes.boxContainer}>
		// 							<Typography variant='h5' color='initial'>
		// 								{id}
		// 							</Typography>
		// 							<Box display='flex' flexWrap='wrap' alignItems='center'>
		// 								<Typography variant='h6' color='initial'>
		// 									Barbero: {name}
		// 								</Typography>
		// 							</Box>
		// 						</Box>
		// 						<Avatar className={classes.avatarContainer}>
		// 							<InfoIcon classes={{ root: classes.iconInfo }} />
		// 						</Avatar>
		// 						{/* </Paper> */}
		// 					</>
		// 				) : null;
		// 			})}
		// 		</Grid>
		// 		<Grid item xs={12}>
		// 			<Grid item xs={6}>
		// 				<Typography
		// 					variant='h4'
		// 					color='initial'
		// 					style={{ textAlign: 'center', color: 'white' }}
		// 				>
		// 					Ultimas llamadas
		// 				</Typography>

		// 				{infoTiquets.map(({ name, state, id }) => {
		// 					return state === 0 ? (
		// 						<Paper
		// 							// variant='outlined'
		// 							style={{
		// 								backgroundColor: 'red',

		// 								margin: '10px',
		// 								maxWidth: '500px',
		// 								width: '100%',
		// 								display: 'flex',
		// 								padding: '10px',
		// 								height: '90px',
		// 								justifyContent: 'center',
		// 								alignItems: 'center',
		// 							}}
		// 						>
		// 							<Box className={classes.boxContainer}>
		// 								<Typography variant='h5' color='initial'>
		// 									{id}
		// 								</Typography>
		// 								<Box display='flex' flexWrap='wrap' alignItems='center'>
		// 									<Typography variant='h6' color='initial'>
		// 										Barbero: {name}
		// 									</Typography>
		// 								</Box>
		// 							</Box>
		// 							<Avatar className={classes.avatarContainer}>
		// 								<CheckCircleIcon classes={{ root: classes.checkInfo }} />
		// 							</Avatar>
		// 						</Paper>
		// 					) : null;
		// 				})}
		// 			</Grid>
		// 		</Grid>
		// 	</Container>
		// </div>
	);
};

export default Monitor;
