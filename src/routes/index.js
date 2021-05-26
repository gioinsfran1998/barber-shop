import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoutes from '././PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { RoutesPrivates, RoutesPublic } from './routes';
// import Layaout from '../Components/Layaout/Layaout';
import Main from '../Components/Main/Main';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const Routes = () => {
	// const showLayout = useSelector((store) => store.enviroment.showLayout);
	const user = useSelector((state) => state.user.user);

	return (
		<Router>
			{/* {user && <Layaout />} */}
			{/* {showLayout && <Layaout />} */}

			<Switch>
				{RoutesPublic.map(({ path, Component }) => {
					return (
						<PublicRoutes
							key={path}
							path={path}
							exact
							component={Component}
							restricted={true}
						/>
					);
				})}

				<Main logged={user}>
					{RoutesPrivates.map(({ path, Component, exact }) => (
						<PrivateRoutes
							exact={exact}
							path={path}
							component={Component}
							key={path}
						/>
					))}
				</Main>
			</Switch>
		</Router>
	);
};

export default Routes;
