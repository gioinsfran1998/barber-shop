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
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { useDebouncedCallback } from 'use-debounce';
import { db, storage } from '../../firebase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
	paperContainer: {
		padding: theme.spacing(4),
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

	const handleChangeAutorized = (event) => {
		setAuthorized(event.target.checked);
	};

	const handleClickPopUp = (variant, message) => {
		enqueueSnackbar(message, { variant });
	};

	const handleAddUser = (
		{
			nombre,
			apellido,
			email,
			role,
			cargo,
			ciudad,
			direccion1,
			direccion2,
			fechaNacimiento,
			docIdentidad,
			telefono,
			departamento,
			imagen,
		},
		actions,
	) => {
		debounce(async () => {
			const storageRef = storage.ref();
			const fileRef = storageRef.child(email);
			await fileRef.put(fileUrl);

			const refImage = await fileRef.getDownloadURL();

			await db
				.collection('usersRole')
				.add({
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
					cargo: cargo && cargo,
					autorizacion: authorized,
					imagen: refImage,
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
					nombre: '',
					apellido: '',
					email: '',
					role: '',
					cargo: '',
					ciudad: '',
					direccion1: '',
					direccion2: '',
					fechaNacimiento: '',
					telefono: '',
					docIdentidad: '',
					departamento: '',
					autorizacion: false,
				}}
				onSubmit={(values, actions) => {
					setLoading(true);
					handleAddUser(values, actions);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={validation}
			>
				{({ values, errors, handleSubmit, handleChange }) => {
					return (
						<form onSubmit={handleSubmit} className={classes.root}>
							<Grid container spacing={6}>
								<Grid item sm={6} xs={12}>
									<Paper variant='outlined' className={classes.paperContainer}>
										<Box pl={5} p={3} display='flex'>
											<Typography variant='h5' color='initial'>
												Agregar Usuario
											</Typography>
										</Box>
										<Box p={3}>
											<Paper
												variant='outlined'
												className={classes.paperContainer}
												style={{ display: 'flex', justifyContent: 'center' }}
											>
												<Box>
													<input
														accept='image/*'
														className={classes.input}
														id='contained-button-file'
														multiple
														type='file'
														// value={values.imagen}
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
													style={{ margin: '5px' }}
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
										</Box>
										<Box p={3}>
											<TextField
												label='Nombres'
												fullWidth
												variant='outlined'
												required
												name='nombre'
												id='nombre'
												type='text'
												value={values.nombre}
												error={errors.nombre}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												label='Apellidos'
												fullWidth
												variant='outlined'
												required
												name='apellido'
												id='apellido'
												type='text'
												value={values.apellido}
												error={errors.apellido}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
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
										<Box p={3}>
											<TextField
												id='telefono'
												name='telefono'
												required
												fullWidth
												variant='outlined'
												label='Telefono'
												value={values.telefono}
												error={errors.telefono}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												id='departamento'
												name='departamento'
												required
												fullWidth
												variant='outlined'
												label='Departamento'
												value={values.departamento}
												error={errors.departamento}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												id='ciudad'
												name='ciudad'
												required
												fullWidth
												variant='outlined'
												label='Ciudad'
												value={values.ciudad}
												error={errors.ciudad}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												id='direccion1'
												name='direccion1'
												required
												fullWidth
												variant='outlined'
												label='Direccion1'
												value={values.direccion1}
												error={errors.direccion1}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												id='direccion2'
												name='direccion2'
												required
												fullWidth
												variant='outlined'
												label='Direccion2'
												value={values.direccion2}
												error={errors.direccion2}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												id='docIdentidad'
												name='docIdentidad'
												required
												fullWidth
												variant='outlined'
												label='Numero de C.I.'
												value={values.docIdentidad}
												error={errors.docIdentidad}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3}>
											<TextField
												id='fechaNacimiento'
												name='fechaNacimiento'
												required
												fullWidth
												variant='outlined'
												label='Fecha de Nacimiento'
												value={values.fechaNacimiento}
												error={errors.fechaNacimiento}
												onChange={handleChange}
											/>
										</Box>
										<Box p={3} display='flex' justifyContent='center'>
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
									</Paper>
								</Grid>
								<Grid item sm={6} xs={12}>
									<Paper variant='outlined' className={classes.paperContainer}>
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

										<Box p={3}>
											<TextField
												id='cargo'
												name='cargo'
												required={authorized}
												fullWidth
												variant='outlined'
												label='Cargo'
												value={values.cargo}
												error={errors.cargo}
												onChange={handleChange}
												disabled={!authorized}
												select
											>
												{cargos.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</Box>
									</Paper>
								</Grid>
							</Grid>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Add;
