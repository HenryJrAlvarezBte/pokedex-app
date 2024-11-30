import { Routes, Route } from 'react-router-dom';
import { Home, Pokedex, Details } from '../app';

import '../App.css';
import ProtectedRoute from './ProtectedRoute';
import '../index.css';

function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/pokedex"
				element={
					<ProtectedRoute>
						<Pokedex />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/pokedex/:name"
				element={
					<ProtectedRoute>
						<Details />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default AppRouter;
