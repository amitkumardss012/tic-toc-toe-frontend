import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, }) => {
    const user = localStorage.getItem('user');
    if (!user) {
        return <Navigate to={"/"} />
    }
};

export default PrivateRoute;
