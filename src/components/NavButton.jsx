import { NavLink } from 'react-router-dom';

const NavButton = ({ button, showTitle }) => {
    return (
        <li>
            {button.path ? (
                <NavLink
                    className="nav__link"
                    key={button.value}
                    to={button.path}
                >
                    <button className="nav__button">
                        <img src={button.icon} alt={button.value} />
                        {showTitle && <p>{button.title}</p>}
                    </button>
                </NavLink>
            ) : (
                <button className="nav__button">
                    <img src={button.icon} alt={button.value} />
                </button>
            )}
        </li>
    );
};

export default NavButton;
