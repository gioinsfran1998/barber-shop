import React, { useEffect, useState } from 'react';
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
	MenuItem,
	CardMedia,
	Divider,
} from '@material-ui/core';
import { useDebouncedCallback } from 'use-debounce';
import { firebase, storage } from '../../firebase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSnackbar } from 'notistack';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
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

const db = firebase.firestore();

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

const Edit = ({ history }) => {
	const classes = useStyles();
	const debounce = useDebouncedCallback((fn) => fn(), 300);
	const [loading, setLoading] = useState(null);
	const [authorized, setAuthorized] = React.useState(false);

	const [fileUrl, setFileUrl] = React.useState(null);
	const [fileLocal, setFileLocal] = React.useState(null);

	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const { enqueueSnackbar } = useSnackbar();

	const onFileChange = async (e) => {
		const file = e.target.files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(file.name);
		setFileUrl(file);
		setFileLocal(URL.createObjectURL(file));
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
		console.log(date);
	};

	const phoneValidation = /((097|096|099|098)\d{7})|((097|096|099|098)\d{1}\s{1}\d{6})|([\+]\d{3}\s{1}(99|98|97|96)\d{7})/;
	const identificationValidation = /(^\d{1}\d{5,6})|(^\d{1}\.\d{3}\.\d{3})|(^\d{3}\.\d{3})/g;

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
				'no es un documento de identidad valido',
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

	const {
		id,
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
		authorization,
	} = history.location.state;

	useEffect(() => {
		if (authorization) {
			setAuthorized(authorization);
		}
	}, []);

	const handleChangeChecked = (event) => {
		setAuthorized(event.target.checked);
	};

	const handleClickPopUp = (variant, message) => {
		console.log(variant, 'variant');
		enqueueSnackbar(message, { variant });
	};

	const handleEdit = ({
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
		state,
		image,
	}) => {
		console.log({ updateAt: format(new Date(), 'dd/MM/yyyy') });
		const phoneFiltered = parseFloat(phone.replace(/([595]{3})|[^0-9]/g, ''));
		const identificationFiltered = parseFloat(
			identificationNumber.replace(/[^\d]/g, ''),
		);
		debounce(async () => {
			const storageRef = storage.ref();
			const fileRef = storageRef.child(email);
			await fileRef.put(fileUrl);

			const refImage = await fileRef.getDownloadURL();

			await db
				.collection('usersRole')
				.doc(id)
				.update({
					name,
					lastName,
					email,
					role,
					city,
					address2,
					address1,
					dateOfBirth: format(selectedDate, 'dd/MM/yyyy'),
					identificationNumber,
					phone: phoneFiltered,
					state,
					authorization: authorized,
					image: refImage,
					updateAt: format(new Date(), 'dd/MM/yyyy'),
				})
				.then(() => {
					setLoading(false);
					history.push('/users/list');
					console.log('Ok Editado!!!');
					handleClickPopUp('success', 'Usuario editado con éxito');
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
				}}
				onSubmit={(values, { resetForm }) => {
					setLoading(true);
					handleEdit(values);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={validation}
			>
				{({
					values,
					errors,
					handleSubmit,
					handleChange,
					touched,
					handleBlur,
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
											Editar Usuario
										</Typography>
										<Divider className={classes.divider} />
									</Grid>

									<Grid item container xs={12} justify='center'>
										{/* <Box p={4} display='flex' justifyContent='center'> */}
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
														{fileLocal && (
															<CardMedia
																className={classes.cardImageContainer}
																image={fileLocal}
																title='Live from space album cover'
															/>
														)}

														{!fileLocal && (
															<CardMedia
																className={classes.cardImageContainer}
																image={image}
																title='Live from space album cover'
															/>
														)}

														<PhotoCamera className={classes.imagePhoto} />
													</ButtonBase>
												</label>
											</Box>

											<FormControlLabel
												control={
													<Checkbox
														checked={authorized}
														onChange={handleChangeChecked}
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
												error={errors.name && touched.name && errors.name}
												helperText={errors.name && touched.name && errors.name}
												onBlur={handleBlur}
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
												error={
													errors.lastName && touched.lastName && errors.lastName
												}
												helperText={
													errors.lastName && touched.lastName && errors.lastName
												}
												onBlur={handleBlur}
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
												error={errors.email && touched.email && errors.email}
												helperText={
													errors.email && touched.email && errors.email
												}
												onBlur={handleBlur}
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
												error={errors.phone && touched.phone && errors.phone}
												helperText={
													errors.phone && touched.phone && errors.phone
												}
												onBlur={handleBlur}
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
												error={errors.state && touched.state && errors.state}
												helperText={
													errors.state && touched.state && errors.state
												}
												onBlur={handleBlur}
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
												error={errors.city && touched.city && errors.city}
												helperText={errors.city && touched.city && errors.city}
												onBlur={handleBlur}
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
												error={
													errors.address1 && touched.address1 && errors.address1
												}
												helperText={
													errors.address1 && touched.address1 && errors.address1
												}
												onBlur={handleBlur}
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
												error={
													errors.address2 && touched.address2 && errors.address2
												}
												helperText={
													errors.address2 && touched.address2 && errors.address2
												}
												onBlur={handleBlur}
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
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item lg={6} sm={6} xs={12}>
										<Box p={3}>
											<KeyboardDatePicker
												disableToolbar
												variant='inline'
												style={{ width: '100%' }}
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
												error={errors.role && touched.role && errors.role}
												helperText={errors.role && touched.role && errors.role}
												onBlur={handleBlur}
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
												// fullWidth
												variant='contained'
												color='secondary'
												className={classes.button}
												// onClick={() => handleClose()}
											>
												Cancelar
											</Button>
											<Button
												// fullWidth
												variant='contained'
												color='primary'
												type='submit'
												onClick={handleSubmit}
												disabled={loading}
												className={classes.button}
											>
												Editar
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

export default Edit;
