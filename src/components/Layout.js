import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
			</Navbar>
			<main className="p-4">{children}</main>
		</div>
	);
}

export default Layout;
