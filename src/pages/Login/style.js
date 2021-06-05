import { makeStyles } from '@material-ui/core';

import loginImage from '../../assets/images/barber6.jpg';

export const useStyles = makeStyles((theme) => ({
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
