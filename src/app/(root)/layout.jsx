import HelpWidget from '../../components/shared/HelpWidget';
import Navbar from '../../components/navbar/Navbar';
import '../styles.scss';
import { Outlet } from 'react-router-dom';
import LoginWidget from '../../components/shared/LoginWidget';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsAuthenticated,
    setIsInstructor,
    setUser,
} from '../../lib/utils/globalState/userSlice';
import {
    getUser,
    getUserLastUpdate,
    refreshToken,
} from '../../lib/actions/user.actions';

function Layout() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);
    const storedUser = localStorage.getItem('user');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        if (storedUser && storedRefreshToken) {
            const tokenFetch = async () => {
                const response = await refreshToken(
                    JSON.parse(storedRefreshToken)
                ).then((res) => res.json());
                if (response.token) {
                    localStorage.setItem(
                        'token',
                        JSON.stringify(response.token)
                    );
                    dispatch(setIsInstructor(response?.isInstructor));
                }
            };
            tokenFetch();
            const userLastUpdateFetch = async () => {
                const response = await getUserLastUpdate().then((res) =>
                    res.json()
                );
                const lastUpdate = new Date(response.lastUpdate);
                const storedUserLastUpdate = new Date(
                    JSON.parse(storedUser)?.updatedAt
                );
                const isUpToDate =
                    lastUpdate.getTime() === storedUserLastUpdate.getTime();
                if (!isUpToDate) {
                    const user = await getUser().then((res) => res.json());
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(setUser(user));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setIsInstructor(user?.isInstructor));
                } else {
                    const user = JSON.parse(storedUser);
                    dispatch(setUser(user));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setIsInstructor(user?.isInstructor));
                }
            };
            userLastUpdateFetch();
        }
    }, []);

    return (
        <>
            <Toaster toastOptions={{ duration: 2500 }} />
            <header>
                <Navbar />
                {!isAuthenticated && <LoginWidget />}
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <HelpWidget />
            </footer>
        </>
    );
}

export default Layout;
