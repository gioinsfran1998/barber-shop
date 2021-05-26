import {
	Avatar,
	Box,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { isEmpty } from 'lodash';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLayoutAction } from '../../redux/enviroment';

const useStyles = makeStyles((theme) => ({
	paperContainer: {
		padding: theme.spacing(6),
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
		state: 2,
	},
	{
		id: '012332',
		name: 'Diego Gimenez',
		service: 'Corte',
		barber: 'Alberto Martinez',
		state: 1,
	},
];

const Monitor = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const existState2 = infoTiquets.filter((ticket) => {
		return ticket.state === 2;
	});

	return (
		<div>
			<IconButton
				aria-label='close'
				onClick={() => {
					console.log(history);
					history.push('/');
					dispatch(showLayoutAction(true));
				}}
			>
				<ArrowBackIosIcon />
			</IconButton>
			<Paper variant='outlined' className={classes.paperContainer}>
				<Paper variant='outlined'>
					<Box
						style={{
							padding: '5px',
							width: '100%',
							// height: '350px',
							// backgroundColor: '#8c8c8c',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							style={{
								width: '100%',

								display: 'flex',
								justifyContent: 'center',
								padding: '5px',
							}}
						>
							<Typography variant='h4' color='initial'>
								Llamada Actual
							</Typography>
						</Box>
						<Grid
							container
							justify='space-evenly'
							// alignItems='stretch'
							style={{
								// backgroundColor: 'orange',

								height: '100%',
							}}
						>
							{isEmpty(existState2) && (
								<Grid
									item
									style={{
										// backgroundColor: 'green',
										// width: '400px',
										// height: '260px',
										margin: '10px',
									}}
								>
									<Paper
										style={{
											backgroundColor: 'orange',
											width: '400px',
											height: '260px',
											padding: '5px',
											display: 'flex',
										}}
									>
										<Typography variant='h2' color='initial'>
											Sin llamada Actual
										</Typography>
									</Paper>
								</Grid>
							)}

							{infoTiquets.map(({ name, id, barber, state, service }) => {
								return (
									state === 2 && (
										<Grid
											item
											style={{
												// backgroundColor: 'green',
												// width: '400px',
												// height: '260px',
												margin: '10px',
											}}
										>
											<Paper
												style={{
													backgroundColor: 'green',
													width: '450px',
													height: '300px',
													padding: '5px',
													display: 'flex',
													flexDirection: 'column',
													justifyContent: 'center',
													alignItems: 'center',
												}}
											>
												<Typography variant='h2' color='initial'>
													N° {id}
												</Typography>
												<Typography variant='h4' color='initial'>
													Cliente: {name}
												</Typography>
												<Typography variant='h4' color='initial'>
													Barbero: {barber}
												</Typography>
												<Typography variant='h4' color='initial'>
													Servicio: {service}
												</Typography>
											</Paper>
										</Grid>
									)
								);
							})}
						</Grid>
					</Box>
				</Paper>
				<Grid
					container
					justify='space-evenly'
					xs={12}
					// alignItems='center'
					style={{
						width: '100%',
						// backgroundColor: '#8c8c8c',
						marginTop: '10px',
						padding: '5px',
					}}
				>
					<Grid item sm={6} xs={12}>
						<Grid item>
							<Typography
								variant='h4'
								color='initial'
								style={{ textAlign: 'center' }}
							>
								Proximas llamadas
							</Typography>
						</Grid>

						{infoTiquets.map(({ name, state, id }) => {
							return state === 1 ? (
								<Grid
									item
									container
									// sm={12}
									xs={12}
									direction='column'
									alignContent='center'
									// alignItems='stretch'
									style={{ padding: '10px' }}
								>
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
								</Grid>
							) : null;
						})}
					</Grid>

					<Grid item xs={6}>
						<Grid item xs={12}>
							<Typography
								variant='h4'
								color='initial'
								style={{ textAlign: 'center' }}
							>
								Ultimas llamadas
							</Typography>
						</Grid>

						{infoTiquets.map(({ name, state, id }) => {
							return state === 0 ? (
								<Grid
									item
									container
									xs={12}
									direction='column'
									alignContent='center'
									// alignItems='stretch'
									style={{ padding: '10px' }}
								>
									<Paper
										// variant='outlined'
										style={{
											backgroundColor: 'red',

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
								</Grid>
							) : null;
						})}
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default Monitor;
