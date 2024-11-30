import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useNameContext } from '../contexts/nameContext';

const ProtectedRoute = ({ children }) => {
	const [name] = useNameContext();

	if (!name) {
		return <Navigate to="/" />;
	}

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
