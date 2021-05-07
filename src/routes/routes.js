import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import userList from '../pages/Users/List';
import userAdd from '../pages/Users/Add';
import userEdit from '../pages/Users/Edit';

export const RoutesPublic = [
	{
		path: '/',
		Component: Login,
	},
];

export const RoutesPrivates = [
	{
		path: '/home',
		Component: Home,
		exact: true,
	},
	// {
	// 	path: '/users/detail',
	// 	Component: UserDetails,
	// 	exact: false,
	// },
	{
		path: '/users/edit',
		Component: userEdit,
		exact: false,
	},
	{
		path: '/users/list',
		Component: userList,
		exact: false,
	},
	{
		path: '/users/add',
		Component: userAdd,
		exact: false,
	},
];
