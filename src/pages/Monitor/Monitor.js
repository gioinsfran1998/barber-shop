import React, { useState, useEffect } from 'react';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLayoutAction } from '../../redux/enviroment';

import {
	Box,
	Button,
	Container,
	IconButton,
	makeStyles,
	Paper,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { db } from '../../firebase';
import Timer from '../../Components/Timer/Timer';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.primary.main,
		height: '60px',
		padding: '10px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
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
		// border: '2px solid',
		width: '150px',
		height: '150px',
	},
	input: {
		display: 'none',
	},

	boxContainer: {
		marginLeft: '5px',
		flexGrow: 1,
	},
}));

export const streamTickets = (observer) => {
	return db.collection('tickets').onSnapshot(observer);
};

// Filter state == 2

/*

(0)Amarillo: Cancelado
(1)Red: Finalizando...
(2)Green: Llamada actual
(3)orange: Pendiente


*/

const ticketColor = [
	{
		state: 0,
		backgroundColor: 'yellow',
	},
	{
		state: 1,
		backgroundColor: 'red',
		color: 'white',
	},
	{
		state: 2,
		backgroundColor: 'green',
	},
	{
		state: 3,
		backgroundColor: 'orange',
	},
];

const Monitor = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const [tickets, setTickets] = useState([]);

	const [stateBox, setStateBox] = useState(3);

	useEffect(() => {
		const unsubscribe = streamTickets({
			next: (querySnapshot) => {
				const updateTickets = querySnapshot.docs.map((docSnapshot) => {
					return { ...docSnapshot.data(), id: docSnapshot.id };
				});

				setTickets(updateTickets);
			},
			error: () => console.log('grocery-list-item-get-fail'),
		});

		return unsubscribe;
	}, []);
	console.log(tickets);

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
			name: 'Victor Rolon Espinola',
			service: 'Corte y Ceja',
			barber: 'Miguel Lopez ',
			state: 0,
		},
		{
			id: '23203',
			name: 'Jamon Jonas',
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
			id: '23231',
			name: 'Gusti Lomaquiz',
			service: 'Ceja',
			barber: 'Jonas Guiterres',
			state: stateBox,
		},
	];

	const existState2 = tickets.filter((ticket) => {
		return ticket.state === 1;
	});

	return (
		<Box
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				minHeight: '100%',
				// backgroundColor: 'red',
			}}
		>
			<Box className={classes.container}>
				<IconButton
					aria-label='close'
					onClick={() => {
						history.push('/');
						dispatch(showLayoutAction(true));
					}}
				>
					<ArrowBackIosIcon style={{ color: 'white' }} />
				</IconButton>

				<Button variant='contained'>Cancelar</Button>
				<Button variant='contained'>Llamar</Button>
				<Button variant='contained'>Pendiente</Button>

				<Timer />
			</Box>
			<Container maxWidth='xl' style={{ height: '100%', padding: '20px' }}>
				<Paper
					variant='outlined'
					style={{
						height: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-evenly',
					}}
				>
					<Box
						style={{
							width: '100%',
							maxWidth: '700px',
							height: '100%',
							padding: '20px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Paper
							variant='outlined'
							style={{
								width: '100%',
								minHeight: '600px',
								margin: '0 auto',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexWrap: 'wrap',
							}}
						>
							{isEmpty(existState2) && (
								<Paper
									style={{
										margin: '10px',
										backgroundColor: 'orange',
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
									<Typography variant='h4' color='initial'>
										Sin llamada Actual
									</Typography>
								</Paper>
							)}
							{tickets.map(({ name, id, state, barber, service, number }) => {
								return (
									state === 1 && (
										<Paper
											style={{
												margin: '10px',
												backgroundColor: 'red',
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
											<Typography variant='h6' color='secondary'>
												N° {number}
											</Typography>
											<Typography variant='h6' color='secondary'>
												Cliente: {name}
											</Typography>
											<Typography variant='h6' color='secondary'>
												Barbero: {barber}
											</Typography>
											<Typography variant='h6' color='secondary'>
												Servicio: {service}
											</Typography>
										</Paper>
									)
								);
							})}
						</Paper>
					</Box>
					<Box
						style={{
							width: '100%',
							maxWidth: '600px',
							height: '100%',
							padding: '20px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Paper
							variant='outlined'
							style={{
								width: '100%',
								maxWidth: '600px',
								height: '100%',
								minHeight: '300px',
								padding: '20px',
								margin: '0 auto',
							}}
						>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									height: '70px',
									margin: '10px',
									padding: '20px',
								}}
							>
								<Box style={{ width: '50%' }}>
									<Typography
										variant='h5'
										color='initial'
										style={{
											width: '200px',
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										Turno
									</Typography>
								</Box>
								<Box
									style={{
										width: '50%',
									}}
								>
									<Typography
										variant='h5'
										color='initial'
										style={{
											width: '200px',
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										Cliente
									</Typography>
								</Box>
							</Box>

							{tickets.map(({ name, id, state, barber, service, number }) => {
								return (
									<Paper
										variant='outlined'
										style={{
											margin: '10px',
											transition: 'background-color 0.5s ease',
											backgroundColor:
												ticketColor[state].backgroundColor || 'inherit',
											// backgroundColor: 'green',
											opacity: state === 1 ? 0 : 2,
											// opacity: state === 1 ? 0 : 2,
											// transition de agregar/quitar
											transition: 'opacity 1s ease',

											color: ticketColor[state].color || 'inherit',
											display: 'flex',
											alignItems: 'center',
											height: '80px',
										}}
									>
										<Box style={{ width: '50%' }}>
											<Typography
												color='initial'
												style={{
													width: '200px',
													display: 'flex',
													justifyContent: 'flex-start',
													fontSize: '25px',
													paddingLeft: '40px',
												}}
											>
												{number}
											</Typography>
										</Box>
										<Box style={{ width: '50%' }}>
											<Typography
												color='initial'
												style={{
													width: '200px',
													display: 'flex',
													justifyContent: 'flex-start',
													fontSize: '25px',
												}}
											>
												{name}
											</Typography>
										</Box>
									</Paper>
								);
							})}
						</Paper>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default Monitor;
