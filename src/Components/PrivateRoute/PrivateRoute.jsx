import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { RefundPage } from '../../Pages/RefundPage';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;