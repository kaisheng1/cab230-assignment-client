import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [ isAuthenticated, setIsAuthenticated ] = useState(true);
	const doLogin = () => {
		setIsAuthenticated(true);
	};
	const doLogout = () => {
		setIsAuthenticated(false);
	};
	return <AuthContext.Provider value={{ isAuthenticated, doLogin, doLogout }}>{children}</AuthContext.Provider>;
};
