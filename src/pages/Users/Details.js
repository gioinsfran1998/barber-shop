import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import firebase from 'firebase/app';
import { useSnackbar } from 'notistack';

import {
	Paper,
	makeStyles,
	Grid,
	Box,
	Typography,
	Divider,
	ButtonBase,
	CardMedia,
	Checkbox,
	FormControlLabel,
	Table,
	TableContainer,
	TableRow,
	TableCell,
	TableBody,
	Button,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
	rootPaper: {
		padding: theme.spacing(6),
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
	tableRow: {
		borderColor: theme.palette.divider,
		backgroundColor: theme.palette.background.paper,
	},
	tableContainer: {
		width: '100%',
	},
	tableRowButton: {
		padding: '10px',
		backgroundColor: 'red',
	},
}));

const db = firebase.firestore();

const Details = () => {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleClickPopUp = (variant, message) => {
		console.log(variant, 'variant');
		enqueueSnackbar(message, { variant });
	};

	useEffect(() => {
		if (!history.location.state) history.goBack();
	}, []);

	const handleDeleteUser = async (id) => {
		setLoading(true);
		await db
			.collection('usersRole')
			.doc(id)
			.delete()
			.then(() => {
				handleClickPopUp('success', 'Usuario eliminado correctamente!!');
				setLoading(false);
				history.push('/users/list');
			})
			.catch((err) => {
				setLoading(false);
				handleClickPopUp('error', 'No se pudo eliminar usuario :(');
			});
	};

	const {
		name,
		id,
		image,
		active,
		lastName,
		email,
		role,
		city,
		address2,
		address1,
		dateOfBirth,
		identificationNumber,
		phone,
		authorization,
		state,
		createdAt,
		updateAt,
	} = history.location.state || {
		name: ' ',
		id: '',
		image: '',
		active: '',
		lastName: '',
		email: '',
		role: '',
		city: '',
		address2: '',
		address1: '',
		dateOfBirth: '',
		identificationNumber: '',
		phone: '',
		authorization: '',
		state: '',
		createdAt: '',
		updateAt: '',
	};

	console.log(history.location);

	return (
		<Paper variant='outlined' classes={{ root: classes.rootPaper }}>
			<Grid container spacing={5} justify='center'>
				<Grid item sm={7} xs={12}>
					<Paper variant='outlined'>
						<Box p={5}>
							<Typography variant='h6'>Detalles Perfil</Typography>
						</Box>
						<Divider />
						<Box
							p={3}
							display='flex'
							flexDirection='column'
							justifyContent='space-evenly'
							alignItems='center'
						>
							<Box mt={2}>
								<input
									accept='image/*'
									className={classes.input}
									id='contained-button-file'
									multiple
									type='file'
								/>
								<label htmlFor='contained-button-file'>
									<ButtonBase
										variant='contained'
										color='primary'
										component='span'
									>
										<CardMedia
											className={classes.cardImageContainer}
											image={image}
											title='Live from space album cover'
										/>
										<PhotoCamera className={classes.imagePhoto} />
									</ButtonBase>

									<FormControlLabel
										style={{ margin: '5px' }}
										control={
											<Checkbox checked={active} disabled color='primary' />
										}
										label='Activo'
									/>
								</label>
							</Box>
						</Box>
						<Divider />
						<TableContainer>
							<Table className={classes.tableContainer}>
								<TableBody>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Nombres
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{name}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Apellidos
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{lastName}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Telefono
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{phone}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Departamento
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{state}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Ciudad
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{city}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Direccion 1
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{address1}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Direccion 2
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{address2}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Correo
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{email}
										</TableCell>
									</TableRow>

									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Documento de Identidad
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{identificationNumber}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Fecha de Nacimiento
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{dateOfBirth}
										</TableCell>
									</TableRow>
									<TableRow selected={true}>
										<TableCell
											component='th'
											scope='row'
											classes={{ root: classes.tableRow }}
											variant='head'
										>
											Fecha de Registro
										</TableCell>
										<TableCell
											align='left'
											classes={{ root: classes.tableRow }}
										>
											{createdAt}
										</TableCell>
									</TableRow>

									{updateAt == '' ? null : (
										<TableRow selected={true}>
											<TableCell
												component='th'
												scope='row'
												classes={{ root: classes.tableRow }}
												variant='head'
											>
												Fecha de Actualizacion
											</TableCell>
											<TableCell
												align='left'
												classes={{ root: classes.tableRow }}
											>
												{updateAt}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
								<Box p={4}>
									<Button
										variant='contained'
										color='primary'
										onClick={() => {
											handleDeleteUser(id);
										}}
									>
										Eliminar
									</Button>
								</Box>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Details;
