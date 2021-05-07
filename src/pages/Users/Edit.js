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
} from '@material-ui/core';
import { useDebouncedCallback } from 'use-debounce';
import { firebase, storage } from '../../firebase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
	root: {
		// padding: theme.spacing(6),
		'& .MuiTextField-root': {
			// paddingBottom: theme.spacing(4),
			// marginTop: "10px",
			// width: "100%",
		},
	},
	paperContainer: {
		padding: theme.spacing(4),
	},
	paperImgContainer: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignContent: 'center',
		flexWrap: 'wrap',
		minHeight: '180px',
		width: '100%',
		maxWidth: '400px',
		maxHeight: '250px',
		padding: '5px',
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
		borderRadius: '50%',
		borderColor: theme.palette.divider,
		border: '2px solid',
		width: '100px',
		height: '100px',
	},
	input: {
		display: 'none',
	},
	imagePhoto: {
		position: 'absolute',
		opacity: '0.4',
	},
}));

const db = firebase.firestore();

const cargos = [
	{
		value: 'auxiliar',
		label: 'Auxiliar',
	},
	{
		value: 'gerente',
		label: 'Gerente',
	},
	{
		value: 'cajero',
		label: 'Cajero',
	},
];

const rangos = [
	{
		value: 'administrador',
		label: 'Administrador',
	},
	{
		value: 'responsable',
		label: 'Responsable',
	},
	{
		value: 'encargado',
		label: 'Encargado',
	},
	{
		value: 'funcionario',
		label: 'Funcionario',
	},
];

const Edit = ({ history }) => {
	const classes = useStyles();
	const debounce = useDebouncedCallback((fn) => fn(), 300);
	const [loading, setLoading] = useState(null);
	const [authorized, setAuthorized] = React.useState(false);

	const [fileUrl, setFileUrl] = React.useState(null);
	const [fileLocal, setFileLocal] = React.useState(null);

	const { enqueueSnackbar } = useSnackbar();

	const onFileChange = async (e) => {
		const file = e.target.files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(file.name);
		setFileUrl(file);
		setFileLocal(URL.createObjectURL(file));
	};

	const validation = Yup.object().shape({
		nombre: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		apellido: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		telefono: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		fechaNacimiento: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		departamento: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		direccion2: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		direccion1: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		ciudad: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		docIdentidad: Yup.string()
			.min(2, 'Muy corto!')
			.max(50, 'Muy largo!')
			.required('Requerido'),
		email: Yup.string()
			.email('Introduce un Email correcto!')
			.required('Requerido!'),
		role: Yup.string().when('$user', (_, passSchema) =>
			authorized ? passSchema.required() : passSchema,
		),
		cargo: Yup.string().when('$user', (_, passSchema) =>
			authorized ? passSchema.required() : passSchema,
		),
	});

	const {
		nombre,
		role,
		id,
		estado,
		email,
		cargo,
		apellido,
		autorizacion,
		ciudad,
		direccion1,
		direccion2,
		fechaNacimiento,
		telefono,
		docIdentidad,
		departamento,
		imagen,
	} = history.location.state;

	useEffect(() => {
		if (autorizacion) {
			setAuthorized(autorizacion);
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
		nombre,
		apellido,
		email,
		role,
		cargo = null,
		ciudad,
		direccion1,
		direccion2,
		fechaNacimiento,
		docIdentidad,
		telefono,
		departamento,
	}) => {
		debounce(async () => {
			const storageRef = storage.ref();
			const fileRef = storageRef.child(email);
			await fileRef.put(fileUrl);

			const refImage = await fileRef.getDownloadURL();

			await db
				.collection('usersRole')
				.doc(id)
				.update({
					nombre,
					apellido,
					telefono,
					ciudad,
					direccion1,
					direccion2,
					fechaNacimiento,
					docIdentidad,
					departamento,
					email,
					role,
					cargo,
					autorizacion: authorized,
					imagen: refImage,
				})
				.then(() => {
					setLoading(false);
					history.push('/usuarios/lista');
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
					nombre,
					apellido,
					email,
					role,
					estado,
					cargo,
					ciudad,
					direccion1,
					direccion2,
					fechaNacimiento,
					telefono,
					docIdentidad,
					departamento,
				}}
				onSubmit={(values, { resetForm }) => {
					setLoading(true);
					handleEdit(values);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={validation}
			>
				{({ values, errors, handleSubmit, handleChange, dirty }) => {
					return (
						<form onSubmit={handleSubmit} className={classes.root}>
							<Paper variant='outlined' className={classes.paperContainer}>
								<Grid
									container
									justify='space-evenly'
									alignItems='center'
									spacing={1}
								>
									<Grid item xs={12}>
										<Box pl={5} p={3} display='flex'>
											<Typography variant='h5' color='initial'>
												Editar Usuario
											</Typography>
										</Box>
									</Grid>
									<Grid item sm={6}>
										<Box p={4} display='flex' justifyContent='center'>
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
																	image={imagen}
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
										</Box>
									</Grid>
									<Grid
										item
										container
										sm={6}
										// spacing={6}
										justify='flex-end'
										alignItems='center'
									>
										<Grid item sm={12} xs={12}>
											<Box p={3}>
												<TextField
													fullWidth
													// // defaultValue="Nombres"
													variant='outlined'
													label='Nombres'
													required
													name='nombre'
													id='nombre'
													type='text'
													value={values.nombre}
													error={errors.nombre}
													onChange={handleChange}
												/>
											</Box>
										</Grid>
										<Grid item sm={12} xs={12} style={{ paddingTop: '3px' }}>
											<Box p={3}>
												<TextField
													fullWidth
													// defaultValue="Apellidos"
													variant='outlined'
													label='Apellidos'
													required
													name='apellido'
													id='apellido'
													// defaultValue="Borges Pereira"
													type='text'
													value={values.apellido}
													error={errors.apellido}
													onChange={handleChange}
												/>
											</Box>
										</Grid>
									</Grid>

									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='email'
												name='email'
												required
												fullWidth
												variant='outlined'
												label='Email'
												disabled
												value={values.email}
												error={errors.email}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='telefono'
												name='telefono'
												required
												fullWidth
												variant='outlined'
												label='Telefono'
												// defaultValue="(0993) 534536"
												value={values.telefono}
												error={errors.telefono}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='departamento'
												name='departamento'
												required
												fullWidth
												variant='outlined'
												label='Departamento'
												// defaultValue="Alto Parana"
												value={values.departamento}
												error={errors.departamento}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='ciudad'
												name='ciudad'
												required
												fullWidth
												variant='outlined'
												label='Ciudad'
												// defaultValue="Ciudad del Este"
												value={values.ciudad}
												error={errors.ciudad}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='direccion1'
												name='direccion1'
												required
												fullWidth
												variant='outlined'
												label='Direccion1'
												// defaultValue="Barrio los cedrales"
												value={values.direccion1}
												error={errors.direccion1}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='direccion2'
												name='direccion2'
												required
												fullWidth
												variant='outlined'
												label='Direccion2'
												// defaultValue="Calle Brasil, numero #45"
												value={values.direccion2}
												error={errors.direccion2}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='docIdentidad'
												name='docIdentidad'
												required
												fullWidth
												variant='outlined'
												label='Numero de C.I.'
												// defaultValue="3.133.345"
												value={values.docIdentidad}
												error={errors.docIdentidad}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} lg={4}>
										<Box p={3}>
											<TextField
												id='fechaNacimiento'
												name='fechaNacimiento'
												required
												fullWidth
												variant='outlined'
												label='Fecha de Nacimiento'
												// defaultValue="21/02/1994"
												value={values.fechaNacimiento}
												error={errors.fechaNacimiento}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
									<Grid item container xs={12} justify='center'>
										<Grid item sm={6} xs={12}>
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
													{rangos.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.label}
														</MenuItem>
													))}
												</TextField>
											</Box>
										</Grid>
									</Grid>

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
							</Paper>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Edit;
