import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isStudent} = useSelector((state:any) => state.auth);

  return isStudent ? children : <Navigate to="/student/login" replace />;
};

export default PrivateRoute;

export const AdminPrivate: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAdmin } = useSelector((state: any) => state.auth)
  return isAdmin ? children : <Navigate to='/admin/login' replace />;

}

export const TutorPrivate: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isTutor } = useSelector((state: any) => state.auth)
  return isTutor?children:<Navigate to='/tutor/login' replace/>
}