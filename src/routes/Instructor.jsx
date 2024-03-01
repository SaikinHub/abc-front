import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function Instructor({ children }) {
    const { isInstructor, isAuthenticated } = useSelector(
        (state) => state.user
    );

    if (isAuthenticated && isInstructor) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}
