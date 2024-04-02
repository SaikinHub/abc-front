import { navbarLinks as buttons } from '../../constants/constants';
import NavButton from '../NavButton';
import MobileNav from '../../components/navbar/MobileNav';
import UserActionsBar from '../shared/UserActionsBar';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { isAuthenticated, isInstructor } = useSelector(
        (state) => state.user
    );
    let buttonsRenderer = null;

    if (isInstructor && isAuthenticated) {
        buttonsRenderer = buttons;
    } else if (isAuthenticated && !isInstructor) {
        buttonsRenderer = buttons.filter((button) => !button.isInstructor);
    } else {
        buttonsRenderer = buttons.filter(
            (button) => !button.loggedIn && !button.isInstructor
        );
    }
    return (
        <nav className="menu">
            {isAuthenticated && <UserActionsBar />}
            {buttonsRenderer && (
                <ul className="desktop-menu">
                    {buttonsRenderer.map((button) => (
                        <NavButton key={button.id} button={button} />
                    ))}
                </ul>
            )}
            <MobileNav />
        </nav>
    );
};

export default NavBar;
