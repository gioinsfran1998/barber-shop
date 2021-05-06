import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase';

const PublicRoutes = ({
	component: Component,
	restricted,
	isAuthenticated,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated && restricted ? (
					<Redirect to='/home' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStatetoProps = (state) => ({
	isAuthenticated: !!state.user.user,
});

export default connect(mapStatetoProps)(PublicRoutes);
