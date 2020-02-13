import React, { createContext, useState, useContext } from 'react';
import { checkLogin, registerUser } from '../API';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [ isAuthenticated, setIsAuthenticated ] = useState(false);

	React.useEffect(() => {
		checkLogin('a@a', 'a')
			.then((token) => {
				localStorage.setItem('token', token);
				setIsAuthenticated(true);
			})
			.catch((err) => console.log(err));
	}, []);

	const doRegister = async (email, password) => {
		await registerUser(email, password);
	};
	const doLogin = async (email, password) => {
		const token = await checkLogin(email, password);
		localStorage.setItem('token', token);
		setIsAuthenticated(true);
	};
	const doLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	};
	return (
		<AuthContext.Provider value={{ isAuthenticated, doLogin, doLogout, doRegister }}>
			{children}
		</AuthContext.Provider>
	);
};
