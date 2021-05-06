import React from 'react';

import { useSelector } from 'react-redux';

import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	makeStyles,
	Switch,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { darkModeAction } from "../../redux/environment";
import { logoutUser } from '../../redux/user';

import { firebase } from '../../firebase';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

const AppBarComponent = ({ handleDrawerToggle, mobileOpen, setMobileOpen }) => {
	// const darkMode = useSelector((state) => state.environment.darkMode);

	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch(logoutUser());
				history.push('/');
			})
			.catch((error) => {});
	};

	return (
		<AppBar position='fixed' className={classes.appBar}>
			<Toolbar>
				<IconButton
					className={classes.menuButton}
					color='inherit'
					aria-label='Menu'
					onClick={handleDrawerToggle}
				>
					<MenuIcon className={classes.menuButton} />
					<div className={classes.grow} />
				</IconButton>
				<Typography variant='h6' color='inherit' className={classes.grow}>
					BarberShop
				</Typography>
				{/* <Switch
          checked={darkMode ? true : false}
          onChange={(value) => dispatch(darkModeAction(value.target.checked))}
        /> */}

				<IconButton color='inherit' aria-label='notifications'>
					<NotificationsIcon />
				</IconButton>

				<Button
					startIcon={<AccountCircleIcon />}
					variant='outlined'
					color='inherit'
					classes={{
						root: classes.buttonLogin,
					}}
					onClick={() => handleLogout()}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		[theme.breakpoints.up('md')]: {
			// width: `calc(100% - ${240}px)`,
			// marginLeft: 240,
		},
		color: '#fafafa',
		boxShadow: 'none',
		// backgroundColor:
		backgroundColor: '#0c0c0c',
		//   theme.palette.type === "dark"
		//     ? theme.palette.background.dark
		//     : theme.palette.primary.main,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

export default AppBarComponent;
