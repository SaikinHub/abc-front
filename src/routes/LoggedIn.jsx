import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function LoggedIn({ children }) {
    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}
