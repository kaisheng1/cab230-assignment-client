import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm() {
	const { isAuthenticated, doLogin, doRegister } = useAuth();
	const { handleSubmit, register, reset } = useForm();
	const [ signup, setSignup ] = useState(false);

	const onSubmit = ({ email, password }) => {
		if (!signup) {
			doLogin(email, password)
				.then(() => {
					alert('You successfully login');
				})
				.catch((err) => console.log(err));
		} else {
			doRegister(email, password)
				.then(() => {
					alert('You successfully registered!');
					setSignup(false);
					reset();
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control name="email" ref={register({ required: true })} type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					name="password"
					ref={register({ required: true })}
					type="password"
					placeholder="Password"
				/>
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
