import { useNavigate } from 'react-router-dom';

const NavButton = ({ button, showTitle }) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(button.path);
    };
    return (
        <li>
            {button.path ? (
                <button
                    className="nav__button"
                    onClick={() => handleNavigation()}
                >
                    <img src={button.icon} alt={button.value} />
                    {showTitle && <p>{button.title}</p>}
                </button>
            ) : (
                <button className="nav__button">
                    <img src={button.icon} alt={button.value} />
                </button>
            )}
        </li>
    );
};

export default NavButton;
