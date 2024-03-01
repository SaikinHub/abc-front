import { Link, useNavigate } from 'react-router-dom';

const ActionIconButton = ({ action, iconUrl, path, id }) => {
    const navigate = useNavigate();

    return (
        <button className="action-icon-button">
            {path ? (
                <Link to={id ? `${path}/${id}` : path}>
                    <img src={iconUrl} alt={action} />
                </Link>
            ) : (
                <img src={iconUrl} alt={action} />
            )}
        </button>
    );
};

export default ActionIconButton;
