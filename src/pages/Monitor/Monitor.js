import {
	Avatar,
	Box,
	Divider,
	Grid,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';

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

const infoTiquets = [
	{
		id: '345334',
		name: 'Juan Roman',
		service: 'Corte',
		barber: 'Jorge Gauto',
		state: 0,
	},
	{
		id: '145234',
		name: 'Victor Rolon',
		service: 'Corte y Ceja',
		barber: 'Miguel Lopez',
		state: 1,
	},
	{
		id: '012332',
		name: 'Diego Gimenez',
		service: 'Corte',
		barber: 'Alberto Martinez',
		state: 2,
	},
];

const Monitor = () => {
	const classes = useStyles();
	return (
		<div>
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
							alignItems='center'
							style={{
								// backgroundColor: 'orange',

								height: '100%',
							}}
						>
							<Grid
								item
								style={{
									backgroundColor: 'green',
									width: '400px',
									height: '260px',
									margin: '10px',
								}}
							>
								<Typography variant='h1' color='initial'>
									Hola
								</Typography>
							</Grid>
							<Grid
								item
								style={{
									backgroundColor: 'green',
									width: '400px',
									height: '260px',
									margin: '10px',
								}}
							>
								<Typography variant='h1' color='initial'>
									Hola 2
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Paper>
				<Grid
					container
					justify='space-evenly'
					// alignItems='center'
					style={{
						width: '100%',
						// backgroundColor: '#8c8c8c',
						marginTop: '10px',
						padding: '5px',
					}}
				>
					{infoTiquets.map(({ name, state, id }) => {
						return state === 1 ? (
							<Grid
								item
								container
								sm={6}
								xs={12}
								direction='column'
								alignContent='center'
								// alignItems='stretch'
								style={{ padding: '10px' }}
							>
								<Paper
									variant='outlined'
									style={{
										margin: '10px',
										maxWidth: '500px',
										width: '100%',
									}}
								>
									<Typography
										variant='h4'
										color='initial'
										style={{ textAlign: 'center' }}
									>
										Proximas llamadas
									</Typography>
								</Paper>
								<Paper
									// variant='outlined'
									style={{
										backgroundColor: 'yellow',
										padding: '5px',
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
					{infoTiquets.map(({ name, state, id }) => {
						return state === 0 ? (
							<Grid
								item
								container
								sm={6}
								xs={12}
								direction='column'
								alignContent='center'
								// alignItems='stretch'
								style={{ padding: '10px' }}
							>
								<Paper
									variant='outlined'
									style={{
										margin: '10px',
										maxWidth: '500px',
										width: '100%',
									}}
								>
									<Typography
										variant='h4'
										color='initial'
										style={{ textAlign: 'center' }}
									>
										Ultimas llamadas
									</Typography>
								</Paper>
								<Paper
									// variant='outlined'
									style={{
										backgroundColor: 'red',
										padding: '5px',
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
			</Paper>
		</div>
	);
};

export default Monitor;
