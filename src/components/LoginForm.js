import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm() {
	const { isAuthenticated, doLogin } = useAuth();
	const [ signup, setSignup ] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!signup) {
			doLogin('a@a', 'a');
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>
			<Button variant="primary" type="submit">
				{signup ? 'Signup' : 'Login'}
			</Button>
			<Button variant="secondary" className="ml-2" type="button" onClick={() => setSignup(!signup)}>
				{signup ? 'Login' : 'Signup'}
			</Button>
			{isAuthenticated && <Redirect to="/" />}
		</Form>
	);
}

export default LoginForm;
