import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { OffenceProvider } from './context/OffenceContext';

ReactDOM.render(
	<AuthProvider>
		<OffenceProvider>
			<App />
		</OffenceProvider>
	</AuthProvider>,
	document.getElementById('root')
);
