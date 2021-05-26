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

import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';

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
	const [selectedDate, setSelectedDate] = React.useState(new Date());

	const onFileChange = async (e) => {
		const file = e.target.files[0];
		// const storageRef = storage.ref();
		// const fileRef = storageRef.child(file && file.name);
		setFileUrl(file);
		setFileLocal(URL.createObjectURL(file));
	};

	// format(date, 'dd/MM/yyyy')

	const handleDateChange = (date) => {
		setSelectedDate(date);
		console.log(date);
	};

	const phoneValidation = /((097|096|099|098)\d{7})|((097|096|099|098)\d{1}\s{1}\d{6})|([\+]\d{3}\s{1}(99|98|97|96)\d{7})|((97|96|99|98)\d{7})/;
	const identificationValidation = /(^\d{1}\d{5,6})|(^\d{1}\.\d{3}\.\d{3})|(^\d{3}\.\d{3})/g;
	// const dateOfBirthValidation = /(^\d{8})|(\d{2}[\.|\s]\d{2}[\.|\s]\d{4})|(\d{2}\/\d{2}\/\d{4})/;

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
			.matches(phoneValidation, 'No es un numero de telefono valido!')
			.required('Requerido'),
		// dateOfBirth: Yup.string()
		// 	.matches(dateOfBirthValidation, 'no es una fecha!')
		// 	.min(8, 'Muy corto!')
		// 	.max(10, 'Muy largo!')
		// 	.required('Requerido'),
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
			.matches(
				identificationValidation,
				'No es un documento de identidad valido!',
			)
			.min(6, 'Muy corto!')
			.max(9, 'Muy largo!')
			.required('Requerido'),
		email: Yup.string()
			.email('Introduce un Email correcto!')
			.required('Requerido!'),
		role: Yup.string().when('$user', (_, passSchema) =>
			authorized ? passSchema.required() : passSchema,
		),
	});

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
		const identificationFiltered = parseFloat(
			identificationNumber.replace(/[^\d]/g, ''),
		);

		// const dateOfBirthFiltered = parseFloat(dateOfBirth.replace(/[^\d]/g, '/'));

		console.log(format(selectedDate, 'dd/MM/yyyy, hh/mm/ss/bb'));

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
					dateOfBirth: format(selectedDate, 'dd/MM/yyyy'),
					identificationNumber: identificationFiltered,
					state,
					email,
					role,
					authorization: authorized,
					image: refImage,
					createdAt: format(new Date(), 'dd/MM/yyyy, hh:mm:ss bb'),
					updateAt: '',
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
					setLoading(true);
					handleAddUser(values, actions);
				}}
				validationSchema={validation}
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
												onChange={handleChange}
												error={errors.name && touched.name && errors.name}
												helperText={errors.name && touched.name && errors.name}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={
													errors.lastName && touched.lastName && errors.lastName
												}
												helperText={
													errors.lastName && touched.lastName && errors.lastName
												}
												onBlur={handleBlur}
											/>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3} display='block'>
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
												onChange={handleChange}
												error={errors.email && touched.email && errors.email}
												helperText={
													errors.email && touched.email && errors.email
												}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={errors.phone && touched.phone && errors.phone}
												helperText={
													errors.phone && touched.phone && errors.phone
												}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={errors.state && touched.state && errors.state}
												helperText={
													errors.state && touched.state && errors.state
												}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={errors.city && touched.city && errors.city}
												helperText={errors.city && touched.city && errors.city}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={
													errors.address1 && touched.address1 && errors.address1
												}
												helperText={
													errors.address1 && touched.address1 && errors.address1
												}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={
													errors.address2 && touched.address2 && errors.address2
												}
												helperText={
													errors.address2 && touched.address2 && errors.address2
												}
												onBlur={handleBlur}
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
												onChange={handleChange}
												error={
													errors.identificationNumber &&
													touched.identificationNumber &&
													errors.identificationNumber
												}
												helperText={
													errors.identificationNumber &&
													touched.identificationNumber &&
													errors.identificationNumber
												}
												onBlur={handleBlur}
											/>
										</Box>
									</Grid>

									<Grid item lg={4} sm={6} xs={12}>
										<Box p={3}>
											<KeyboardDatePicker
												disableToolbar
												variant='inline'
												fullWidth
												label='Fecha de Nacimiento'
												id='dateOfBirth'
												name='dateOfBirth'
												required
												format='dd/MM/yyyy'
												InputAdornmentProps={{ position: 'end' }}
												inputVariant='outlined'
												value={selectedDate}
												onChange={handleDateChange}
												invalidDateMessage='Fecha no valida *'
												minDateMessage='No puede ser menor a la fecha minima'
												maxDateMessage='No puede ser mayor a la fecha maxima'
											/>
										</Box>
									</Grid>

									<Grid justify='flex-start' item lg={4} sm={6} xs={12}>
										<Box p={3}>
											<TextField
												id='role'
												name='role'
												required={authorized}
												fullWidth
												variant='outlined'
												label='Cargo'
												value={values.role}
												onChange={handleChange}
												disabled={!authorized}
												select
												error={errors.role && touched.role && errors.role}
												helperText={errors.role && touched.role && errors.role}
												onBlur={handleBlur}
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
