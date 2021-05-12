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
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { useDebouncedCallback } from 'use-debounce';
import { db, storage } from '../../firebase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
	divider: {
		marginTop: '5px',
		height: '3px',
		backgroundColor: theme.palette.primary.main,
	},
}));

const roles = [
	{
		value: 'admin',
		label: 'Administrador',
	},
	{
		value: 'barber',
		label: 'Barbero',
	},
	{
		value: 'cashier',
		label: 'Cajero',
	},
	{
		value: 'others',
		label: 'Otros',
	},
];

const Add = () => {
	const classes = useStyles();
	const debounce = useDebouncedCallback((fn) => fn(), 300);
	const [fileUrl, setFileUrl] = React.useState(null);
	const [fileLocal, setFileLocal] = React.useState(null);
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const [authorized, setAuthorized] = React.useState(false);

	const onFileChange = async (e) => {
		const file = e.target.files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(file && file.name);
		setFileUrl(file);
		setFileLocal(URL.createObjectURL(file));
	};

	const phoneValidation = /((097|096|099|098)\d{7})|((097|096|099|098)\d{1}\s{1}\d{6})|([\+]\d{3}\s{1}(99|98|97|96)\d{7})/;
	// const identificationValidation = [0-9][^-];

	const validation = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		lastName: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		phone: Yup.string()
			.matches(phoneValidation, 'no es un numero de telefono!')
			.required('Requerido'),
		dateOfBirth: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		state: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		address1: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		address2: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		city: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		identificationNumber: Yup.string()
			.min(5, 'Muy corto!')
			.max(7, 'Muy largo!')
			.required('Requerido'),
		email: Yup.string()
			.email('Introduce un Email correcto!')
			.required('Requerido!'),
		role: Yup.string().when('$user', (_, passSchema) =>
			authorized ? passSchema.required() : passSchema,
		),
	});

	const handleChangeSetPhoneNumber = () => {};

	const handleChangeAutorized = (event) => {
		setAuthorized(event.target.checked);
	};

	const handleClickPopUp = (variant, message) => {
		enqueueSnackbar(message, { variant });
	};

	const handleAddUser = (
		{
			name,
			lastName,
			email,
			role,
			city,
			address2,
			address1,
			dateOfBirth,
			identificationNumber,
			phone,
			countryPhoneCode,
			state,
			image,
		},
		actions,
	) => {
		const phoneFiltered = parseFloat(phone.replace(/([595]{3})|[^0-9]/g, ''));

		debounce(async () => {
			const storageRef = storage.ref();
			const fileRef = storageRef.child(email);
			await fileRef.put(fileUrl);

			const refImage = await fileRef.getDownloadURL();

			await db
				.collection('usersRole')
				.add({
					name,
					lastName,
					phone: phoneFiltered,
					countryPhoneCode,
					city,
					address2,
					address1,
					dateOfBirth,
					identificationNumber,
					state,
					email,
					role,
					authorization: authorized,
					image: refImage,
				})
				.then(() => {
					handleClickPopUp('success', 'Usuario agregado con exito');
					actions.resetForm({});
					setFileLocal(null);
					setLoading(false);
				})
				.catch(() => {
					console.log('CATCHH');
					setLoading(false);
				});
		});
	};

	return (
		<div>
			<Formik
				initialValues={{
					name: '',
					lastName: '',
					email: '',
					role: '',
					cargo: '',
					city: '',
					countryPhoneCode: '+595',
					address2: '',
					address1: '',
					dateOfBirth: '',
					phone: '',
					identificationNumber: '',
					state: '',
					authorization: false,
					image: '',
				}}
				onSubmit={(values, actions) => {
					console.log(values.phone);
					console.log(actions, 'acctt');
					setLoading(true);
					handleAddUser(values, actions);
				}}
				validateOnChange={false}
				validateOnBlur={true}
				validationSchema={validation}
			>
				{({ values, errors, handleSubmit, handleChange }) => {
					return (
						<form onSubmit={handleSubmit} className={classes.root}>
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
											Agregar Usuario
										</Typography>

										<Divider className={classes.divider} />
									</Grid>

									<Grid item container xs={12} justify='center'>
										<Paper
											variant='outlined'
											className={classes.paperImgContainer}
										>
											<Box>
												<input
													accept='image/*'
													className={classes.input}
													id='contained-button-file'
													multiple
													type='file'
													onChange={onFileChange}
												/>
												<label htmlFor='contained-button-file'>
													<ButtonBase
														variant='contained'
														color='primary'
														component='span'
													>
														<CardMedia
															className={classes.cardImageContainer}
															image={fileLocal}
															title='Live from space album cover'
														/>
														<PhotoCamera className={classes.imagePhoto} />
													</ButtonBase>
												</label>
											</Box>

											<FormControlLabel
												control={
													<Checkbox
														authorized={authorized}
														onChange={handleChangeAutorized}
														color='primary'
													/>
												}
												label='Activo'
											/>
										</Paper>
									</Grid>

									<Grid item lg={4} sm={6} xs={12}>
										<Box p={3}>
											<TextField
												label='Nombres'
												fullWidth
												variant='outlined'
												required
												name='name'
												id='name'
												type='text'
												value={values.name}
												error={errors.name}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item lg={4} sm={6} xs={12}>
										<Box p={3}>
											<TextField
												label='Apellidos'
												fullWidth
												variant='outlined'
												required
												name='lastName'
												id='lastName'
												type='text'
												value={values.lastName}
												error={errors.lastName}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												className={classes.textFieldAdd}
												InputLabelProps={{
													className: classes.textFieldInputProps,
												}}
												id='email'
												name='email'
												required
												fullWidth
												variant='outlined'
												label='Email'
												value={values.email}
												error={errors.email}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												className={classes.textFieldAdd}
												InputLabelProps={{
													className: classes.textFieldInputProps,
												}}
												id='phone'
												name='phone'
												required
												fullWidth
												variant='outlined'
												label='Telefono'
												value={values.phone}
												error={errors.phone}
												defaultValue='Hello World'
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												className={classes.textFieldAdd}
												InputLabelProps={{
													className: classes.textFieldInputProps,
												}}
												id='state'
												name='state'
												required
												fullWidth
												variant='outlined'
												label='Departamento'
												value={values.state}
												error={errors.state}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												className={classes.textFieldAdd}
												InputLabelProps={{
													className: classes.textFieldInputProps,
												}}
												id='city'
												name='city'
												required
												fullWidth
												variant='outlined'
												label='Ciudad'
												value={values.city}
												error={errors.city}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												className={classes.textFieldAdd}
												InputLabelProps={{
													className: classes.textFieldInputProps,
												}}
												id='address1'
												name='address1'
												required
												fullWidth
												variant='outlined'
												label='Direccion 1'
												value={values.address1}
												error={errors.address1}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												className={classes.textFieldAdd}
												InputLabelProps={{
													className: classes.textFieldInputProps,
												}}
												id='address2'
												name='address2'
												required
												fullWidth
												variant='outlined'
												label='Direccion 2'
												value={values.address2}
												error={errors.address2}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='identificationNumber'
												name='identificationNumber'
												required
												fullWidth
												variant='outlined'
												label='Numero de Documento'
												value={values.identificationNumber}
												error={errors.identificationNumber}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid item lg={6} sm={6} xs={12}>
										<Box p={3}>
											<TextField
												id='dateOfBirth'
												name='dateOfBirth'
												required
												fullWidth
												variant='outlined'
												label='Fecha de Nacimiento'
												value={values.dateOfBirth}
												error={errors.dateOfBirth}
												onChange={handleChange}
											/>
										</Box>
									</Grid>

									<Grid justify='flex-start' item lg={6} sm={6} xs={12}>
										<Box p={3}>
											<TextField
												id='role'
												name='role'
												required={authorized}
												fullWidth
												variant='outlined'
												label='Rango'
												value={values.role}
												error={errors.role}
												onChange={handleChange}
												disabled={!authorized}
												select
											>
												{roles.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
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
												disabled={loading}
												className={classes.button}
											>
												Agregar
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Paper>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Add;
