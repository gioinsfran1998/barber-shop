import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/images/barber2.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.main,
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		backgroundColor: theme.palette.grey[50],
		padding: 0,
		borderRadius: '6px',
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
		width: '100%',
		height: '100%',
	},
}));

const Login = () => {
	const classes = useStyles();
	const isAuthorized = true;
	return (
		<div className={classes.root}>
			<Container component='main' maxWidth='sm' className={classes.container}>
				<Grid container spacing={0}>
					<Grid item sm={5} className={classes.imgContainer}>
						<Box className={classes.imgLogin} />
					</Grid>
					<Grid item sm={7} className={classes.formContainer}>
						<form className={classes.form} noValidate>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href='#' variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Login;
