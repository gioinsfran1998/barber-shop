import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
	Avatar,
	IconButton,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/images/barber2.jpg';
import gmailIcon from '../../assets/images/logingoogle.png';

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
		backgroundColor: theme.palette.secondary.main,
		padding: 0,
		borderRadius: '6px',
		boxShadow: '0px 0px 12px 0px #000',
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
	textField: {
		backgroundColor: theme.palette.secondary.light,
		borderRadius: '5px',
	},
	textFieldLabel: {
		color: '#fff',
	},
	buttonLogin: {
		marginTop: '20px',
		color: '#fff',
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
		marginTop: '20px',
		// display: 'flex',
		// height: '50px',
		// width: '50px',
	},
}));

const Login = () => {
	const classes = useStyles();
	const isAuthorized = true;
	return (
		<div className={classes.root}>
			<Container component='main' maxWidth='sm' className={classes.container}>
				<Grid container spacing={0}>
					<Grid item sm={7} className={classes.imgContainer}>
						<Box className={classes.imgLogin} />
					</Grid>
					<Grid item sm={5} className={classes.formContainer}>
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
							<FormControlLabel
								style={{ marginTop: '13px', color: '#fafafa' }}
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/>
							<Button
								className={classes.buttonGmail}
								variant='contained'
								fullWidth
								startIcon={
									<img src={gmailIcon} className={classes.avatarGmail} />
								}
								// onClick={() => onLogin()}
							>
								Login Gmail
							</Button>

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
						</form>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Login;
