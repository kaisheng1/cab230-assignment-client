import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import GraphPage from './pages/GraphPage';
import GridPage from './pages/GridPage';
import HomePage from './pages/HomePage';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<ProtectedRoute exact path="/">
					<HomePage />
				</ProtectedRoute>
				<ProtectedRoute path="/grid">
					<GridPage />
				</ProtectedRoute>
				<ProtectedRoute path="/graph">
					<GraphPage />
				</ProtectedRoute>
				<ProtectedRoute path="/map">
					<MapPage />
				</ProtectedRoute>
			</Switch>
		</Router>
	);
}

export default App;
