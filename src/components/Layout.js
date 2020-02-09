import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const routes = [
	{ name: 'Home', to: '/' },
	{ name: 'Grid', to: '/grid' },
	{ name: 'Graph', to: '/graph' },
	{ name: 'Map', to: '/map' }
];

function Layout({ children }) {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Nav className="mr-auto">
					{routes.map((route) => (
						<Nav.Item key={route.to}>
							<Nav.Link as={NavLink} exact to={route.to} eventKey={route.to}>
								{route.name}
							</Nav.Link>
						</Nav.Item>
					))}
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button>
				</Form>
			</Navbar>
			<main className="p-4">{children}</main>
		</div>
	);
}

export default Layout;
