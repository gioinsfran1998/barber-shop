import {
	Box,
	Button,
	Container,
	Grid,
	makeStyles,
	TextField,
} from '@material-ui/core';

import React from 'react';
import { db, firebase } from '../../firebase';
import loginImage from '../../assets/images/barber6.jpg';
import gmailIcon from '../../assets/images/logingoogle.png';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		backgroundColor: '#eeefff',
		padding: 0,
		borderRadius: '6px',
		// boxShadow: '0px 0px 5px 0px #c4c4c4',
	},
	imgContainer: {
		height: '400px',
		display: 'flex',
	},
	imgLogin: {
		borderRadius: '6px 0 0 6px',
		backgroundImage: `url(${loginImage})`,
		width: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
	formContainer: {
		padding: '30px',
		display: 'flex',
		justifyContent: 'center',
	},
	form: {
		// padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},

	buttonLogin: {
		marginTop: '30px',
	},
	avatarGmail: {
		// display: 'flex',
		// color: '#fafafa',
		// backgroundColor:
		// 	theme.palette.type === 'dark'
		// 		? theme.palette.background.paper
		// 		: theme.palette.primary.main,
		height: '25px',
		// width: '25px',
	},
	buttonGmail: {
		color: '#f12a13',
		marginTop: '25px',
		marginBottom: '10px',
		// display: 'flex',
		// height: '50px',
		// width: '50px',
	},
}));

export const getUsersRole = async (email) => {
	const data = await db.collection('usersRole').get();
	try {
		const arrayData = data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		console.log(arrayData);
		const authorized = arrayData
			.map((doc) => doc)
			.filter(function (user) {
				return user.email === email;
			})[0];
		console.log('autorizado', authorized, email);
		return authorized;
	} catch (error) {
		console.log(error);
	}
};

const Login = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onLogin = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(async (result) => {
				const { displayName, email, photoURL, uid } = result.user;
				const isAuthorized = await getUsersRole(email);

				if (isAuthorized) {
					if (isAuthorized.role === 'admin' && isAuthorized.authorization) {
						dispatch(loginUser({ displayName, email, photoURL, uid }));
					} else {
						console.log('usuario no autorizado.');
						// handleClickPopUp("error", "Usuario no autorizado");
					}
				} else {
					console.log('user no exist, cadastrar pfv');
					// handleClickPopUp("error", "No existe usuario");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={classes.root}>
			<Container component='main' maxWidth='sm' className={classes.container}>
				<Grid container spacing={0}>
					<Grid item sm={7} xs={0} className={classes.imgContainer}>
						<Box className={classes.imgLogin} />
					</Grid>
					<Grid item sm={5} xs={12} className={classes.formContainer}>
						<form className={classes.form} noValidate>
							<TextField
								className={classes.textField}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								InputLabelProps={{ className: classes.textFieldLabel }}
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								variant='outlined'
								margin='normal'
								className={classes.textField}
								required
								fullWidth
								name='password'
								label='Password'
								InputLabelProps={{ className: classes.textFieldLabel }}
								type='password'
								id='password'
								autoComplete='current-password'
							/>

							{/* <IconButton>
								<img src={gmailIcon} className={classes.avatarGmail} />
							</IconButton> */}

							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.buttonLogin}
							>
								Sign In
							</Button>
							<Button
								className={classes.buttonGmail}
								variant='contained'
								fullWidth
								startIcon={
									<img
										src={gmailIcon}
										className={classes.avatarGmail}
										alt='gmailicon'
									/>
								}
								onClick={() => onLogin()}
							>
								Login Gmail
							</Button>
						</form>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Login;
