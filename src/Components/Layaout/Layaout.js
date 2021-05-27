/* eslint-disable react/jsx-no-undef */
import React from 'react';
import {
	makeStyles,
	CssBaseline,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	useTheme,
	Collapse,
} from '@material-ui/core';

import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

import { useHistory, withRouter, useLocation } from 'react-router-dom';

import Profile from './Profile';
import AppBar from './AppBar';
import Drawer from './Drawer';
import { showLayoutAction } from '../../redux/enviroment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Layout = (props) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [open, setOpen] = React.useState({
		collapseUsers: false,
		collapseStock: false,
	});

	const showLayout = useSelector((store) => store.enviroment.showLayout);

	const location = useLocation();
	const classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const dispatch = useDispatch();

	const handleDrawerToggle = (props) => {
		setMobileOpen(!mobileOpen);
	};

	// const handleClickCollapse = () => {
	//   setOpen(!open);
	// };

	const handleActivePage = () => {
		if (theme.palette.type === 'dark') {
			return theme.palette.background.dark;
		}

		if (theme.palette.type !== 'dark') {
			return theme.palette.primary.main;
		}
	};

	const navbarItems = [
		{
			text: 'Home',
			route: '/Home',
			icon: <HomeIcon />,
			onClick: () => {
				history.push('/home');
				setMobileOpen(false);
			},
		},
		{
			text: 'Usuarios',
			route: '/users',
			icon: <GroupIcon />,
			collapseName: 'collapseUsers',
			onClick: () => {
				// history.push("/usuarios");
				// setMobileOpen(false);
				setOpen({ ...open, collapseUsers: !open.collapseUsers });
			},
			children: [
				{
					text: 'Lista',
					route: '/users/list',
					onClick: () => {
						history.push('/users/list');
						setMobileOpen(false);
					},
				},
				{
					text: 'Agregar',
					route: '/users/add',
					onClick: () => {
						history.push('/users/add');
						setMobileOpen(false);
					},
				},
			],
		},

		{
			text: 'Stock',
			route: '/stock',
			collapseName: 'collapseStock',
			icon: <FolderOpenIcon />,
			onClick: () => {
				setOpen({ ...open, collapseStock: !open.collapseStock });
				// setOpen(open.!collapseStock);
			},
			children: [
				{
					text: 'Lista',
					route: '/stock/lista',
					onClick: () => {
						history.push('/stock/lista');
						setMobileOpen(false);
					},
				},
				{
					text: 'Detalles',
					route: '/stock/detalles',
					onClick: () => {
						history.push('/stock/detalles');
						setMobileOpen(false);
					},
				},
				{
					text: 'Agregar',
					route: '/stock/agregar',
					onClick: () => {
						history.push('/stock/agregar');
						setMobileOpen(false);
					},
				},
			],
		},
		{
			text: 'Productos',
			route: '/productos',
			collapseName: 'collapseProductos',
			icon: <ShoppingBasketIcon />,
			onClick: () => {
				setOpen({ ...open, collapseProductos: !open.collapseProductos });
				// setOpen(open.!collapseStock);
			},
			children: [
				{
					text: 'Lista',
					route: '/productos/lista',
					onClick: () => {
						history.push('/productos/lista');
						setMobileOpen(false);
					},
				},
				{
					text: 'Detalles',
					route: '/productos/detalles',
					onClick: () => {
						history.push('/productos/detalles');
						setMobileOpen(false);
					},
				},
				{
					text: 'Agregar',
					route: '/productos/agregar',
					onClick: () => {
						history.push('/productos/agregar');
						setMobileOpen(false);
					},
				},
			],
		},
		{
			text: 'Configuraciones',
			route: '/configuraciones',
			icon: <SettingsIcon />,
			onClick: () => {
				history.push('/configuraciones');
				setMobileOpen(false);
			},
		},
		{
			text: 'Monitor',
			route: '/monitor',
			icon: <DesktopWindowsIcon />,
			onClick: () => {
				history.push('/monitor');
				setMobileOpen(false);
				dispatch(showLayoutAction(false));
			},
		},
	];

	const drawer = (
		<div>
			<Divider />

			<Profile />

			<Divider />

			<List>
				{navbarItems.map((item) => {
					const {
						text,
						icon,
						onClick,
						onClose,
						route,
						children,
						collapseName,
					} = item;
					return (
						<div key={text}>
							<ListItem button onClick={onClick} onClose={onClose}>
								{icon && (
									<ListItemIcon
										style={{
											color: location.pathname === route && handleActivePage(),
										}}
									>
										{icon}
									</ListItemIcon>
								)}
								<ListItemText
									primary={text}
									style={{
										color: location.pathname === route && handleActivePage(),
									}}
								/>
								{children && (
									<> {open === true ? <ExpandLess /> : <ExpandMore />} </>
								)}
							</ListItem>

							{children &&
								children.map(({ text, route, onClick }) => {
									return (
										<Collapse
											in={open[collapseName]}
											timeout='auto'
											unmountOnExit
											key={text}
										>
											<List
												component='div'
												disablePadding
												style={{ paddingLeft: 10 }}
											>
												<ListItem button onClick={onClick}>
													<ListItemIcon />
													<ListItemText
														primary={text}
														style={{
															color:
																location.pathname === route &&
																handleActivePage(),
														}}
													/>
												</ListItem>
											</List>
										</Collapse>
									);
								})}
						</div>
					);
				})}
			</List>

			<Divider />
		</div>
	);

	console.log(showLayout);

	return (
		<>
			{showLayout && (
				<div className={classes.root}>
					<CssBaseline />

					<AppBar
						mobileOpen={mobileOpen}
						setMobileOpen={setMobileOpen}
						handleDrawerToggle={() => handleDrawerToggle()}
					/>
					<Drawer
						drawer={drawer}
						mobileOpen={mobileOpen}
						setMobileOpen={setMobileOpen}
						handleDrawerToggle={() => handleDrawerToggle()}
					/>
				</div>
			)}
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

export default withRouter(Layout);
