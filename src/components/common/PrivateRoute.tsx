import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isStudent} = useSelector((state:any) => state.auth);

  return isStudent ? children : <Navigate to="/studentlogin" replace />;
};

export default PrivateRoute;
