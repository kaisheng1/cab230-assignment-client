import React from 'react';
import { useAuth } from '../context/AuthContext';

import Layout from '../components/Layout';

import Button from 'react-bootstrap/Button';

function HomePage() {
	const { doLogout } = useAuth();
	return (
		<Layout>
			<h2>Welcome to home page</h2>
			<Button variant="primary" className="mt-2" onClick={doLogout}>
				Logout
			</Button>
		</Layout>
	);
}

export default HomePage;
