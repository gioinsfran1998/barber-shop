import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

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
];
