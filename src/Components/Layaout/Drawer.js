import React from 'react';

import {
	useTheme,
	IconButton,
	makeStyles,
	Hidden,
	Drawer,
} from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: 240,
			flexShrink: 0,
		},
	},

	logoContainer: {
		width: '100%',
		padding: '20px',
		display: 'flex',
		justifyContent: 'center',
	},
	logo: {
		width: '150px',
	},
	drawerPaper: {
		backgroundColor: '#fafafa',
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			marginTop: theme.mixins.toolbar.minHeight,
		},
	},
}));

const DrawerComponent = ({
	handleDrawerToggle,
	mobileOpen,
	drawer,
	window,
}) => {
	const container =
		window !== undefined ? () => Window().document.body : undefined;

	const classes = useStyles();
	const theme = useTheme();

	return (
		<nav className={classes.drawer} aria-label='mailbox folders'>
			<Hidden smUp implementation='css'>
				<Drawer
					container={container}
					variant='temporary'
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={mobileOpen}
					onClose={() => handleDrawerToggle()}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<IconButton aria-label='close' onClick={handleDrawerToggle}>
						<ArrowBackIosIcon />
					</IconButton>
					{drawer}
				</Drawer>
			</Hidden>

			<Hidden smDown implementation='css'>
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant='permanent'
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};

export default DrawerComponent;
