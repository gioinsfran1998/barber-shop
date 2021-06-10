import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
	Grid,
	makeStyles,
	TextField,
	Button,
	Box,
	Paper,
	Typography,
	FormControlLabel,
	Checkbox,
	ButtonBase,
	CardMedia,
	MenuItem,
	Divider,
	IconButton,
	Container,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Timer from '../../Components/Timer/Timer';
import { useDispatch } from 'react-redux';
import { showLayoutAction } from '../../redux/enviroment';
import { useHistory } from 'react-router-dom';
import { db, storage } from '../../firebase';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: theme.palette.primary.main,
		height: '60px',
		padding: '10px',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		minHeight: '100%',
		// backgroundColor: 'red',
	},
	paperContainer: {
		padding: theme.spacing(6),
		backgroundColor: 'transparent',
	},
}));

const services = [
	{
		value: 'corte',
		label: 'Corte',
	},
	{
		value: 'barba',
		label: 'Barba',
	},
	{
		value: 'ceja',
		label: 'Ceja',
	},
	{
		value: 'lavado',
		label: 'Lavado',
	},
	{
		value: 'color',
		label: 'Color',
	},
];

const Ticket = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const debounce = useDebouncedCallback((fn) => fn(), 300);
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleClickPopUp = (variant, message) => {
		enqueueSnackbar(message, { variant });
	};
	const handleAddTicket = (
		{ name, barber, number, service, state },
		actions,
	) => {
		debounce(async () => {
			await db
				.collection('tickets')
				.add({
					name,
					barber,
					number: Math.floor(Math.random() * 100),
					service,
					state: 3,
					createdAt: format(new Date(), 'dd/MM/yyyy, hh:mm:ss bb'),
				})
				.then(() => {
					handleClickPopUp('success', 'Ticket creado con exito');
					actions.resetForm({});
				})
				.catch(() => {
					console.log('CATCHH');
					setLoading(false);
				});
		});
	};

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					barber: '',
					number: '',
					service: '',
				}}
				onSubmit={(values, actions) => {
					setLoading(true);
					handleAddTicket(values, actions);
				}}
				// validationSchema={validation}
			>
				{({
					values,
					errors,
					handleSubmit,
					handleChange,
					handleBlur,
					touched,
				}) => {
					return (
						<Box className={classes.wrapper}>
							<form onSubmit={handleSubmit}>
								<Box className={classes.appBar}>
									<IconButton
										aria-label='close'
										onClick={() => {
											history.push('/');
											dispatch(showLayoutAction(true));
										}}
									>
										<ArrowBackIosIcon style={{ color: 'white' }} />
									</IconButton>

									<Timer />
								</Box>
								<Container
									maxWidth='lg'
									style={{ height: '100%', padding: '20px' }}
								>
									<Paper variant='outlined' className={classes.paperContainer}>
										<Grid
											container
											justify='flex-start'
											alignItems='center'
											spacing={1}
										>
											<Grid item xs={12} style={{ marginBottom: '10px' }}>
												<Typography
													variant='h5'
													color='initial'
													style={{ paddingLeft: '10px' }}
												>
													Generar Ticket
												</Typography>
											</Grid>

											<Grid item lg={4} sm={6} xs={12}>
												<Box p={3}>
													<TextField
														label='Nombre'
														fullWidth
														variant='outlined'
														required
														name='name'
														id='name'
														type='text'
														value={values.name}
														onChange={handleChange}
														// error={errors.name && touched.name && errors.name}
														// helperText={errors.name && touched.name && errors.name}
														// onBlur={handleBlur}
													/>
												</Box>
											</Grid>

											<Grid item lg={4} sm={6} xs={12}>
												<Box p={3}>
													<TextField
														label='Servicio'
														fullWidth
														variant='outlined'
														required
														name='service'
														id='service'
														type='text'
														value={values.service}
														onChange={handleChange}
														// error={errors.lastName && touched.lastName && errors.lastName}
														// helperText={
														// 	errors.lastName && touched.lastName && errors.lastName
														// }
														// onBlur={handleBlur}
													/>
												</Box>
											</Grid>

											<Grid item sm={6} xs={12} lg={4}>
												<Box p={3}>
													<TextField
														id='barber'
														name='barber'
														required
														fullWidth
														variant='outlined'
														label='Barbero'
														value={values.barber}
														onChange={handleChange}
														// error={errors.email && touched.email && errors.email}
														// helperText={errors.email && touched.email && errors.email}
														// onBlur={handleBlur}
													/>
												</Box>
											</Grid>
											<Grid item container justify='flex-start'>
												<Box p={5} display='flex' justifyContent='center'>
													<Button
														variant='contained'
														color='secondary'
														className={classes.button}
														// onClick={() => handleClose()}
													>
														Cancelar
													</Button>
													<Button
														variant='contained'
														color='primary'
														type='submit'
														onClick={handleSubmit}
														// disabled={loading}
														className={classes.button}
													>
														Agregar
													</Button>
												</Box>
											</Grid>
										</Grid>
									</Paper>
								</Container>
							</form>
						</Box>
					);
				}}
			</Formik>
		</>
	);
};

export default Ticket;
