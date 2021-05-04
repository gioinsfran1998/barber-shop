import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoutes = ({
	isAuthenticated,
	component: Component,
	children,
	...rest
}) => {
	return (
		<Route
			{...rest}
			component={(props) => {
				return isAuthenticated ? (
					<Component {...props} routes={children} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: props.location },
						}}
					/>
				);
			}}
		/>
	);
};

const mapStatetoProps = (state) => ({
	isAuthenticated: !!state.user.user,
});

export default connect(mapStatetoProps)(PrivateRoutes);
