import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isStudent} = useSelector((state:any) => state.auth);

  return isStudent ? children : <Navigate to="/student/login" replace />;
};

export default PrivateRoute;

export const AdminPrivate = ({ children }) => {
  const { isAdmin } = useSelector((state: any) => state.auth)
  return isAdmin ? children : <Navigate to='/admin/login' replace />;

}

export const TutorPrivate = ({ children }) => {
  const { isTutor } = useSelector((state: any) => state.auth)
  return isTutor?children:<Navigate to='/tutor/login' replace/>
}