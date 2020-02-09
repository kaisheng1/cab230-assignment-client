import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Route {...rest}>{children}</Route>;
	} else {
		return <Redirect to="/login" />;
	}
};

export default ProtectedRoute;
