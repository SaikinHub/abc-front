import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../lib/utils/globalState/userSlice';

const UserWidget = ({ user }) => {
    const dispatch = useDispatch();
    const { userObj, isAuthenticated, isInstructor } = useSelector(
        (state) => state.user
    );
    const [isOpen, setIsOpen] = useState(false);

    const disconnect = () => {
        dispatch(resetUser());
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };
    return (
        <div
            className={`authenticated-user-card__wrapper ${
                isOpen ? 'user-card--open' : ''
            }`}
        >
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="authenticated-user-card"
            >
                <div className="authenticated-user-card__image-container">
                    <img src={user.profilePicture} alt="avatar" />
                </div>
                <div className="authenticated-user-card__info-group">
                    <p>Welcome, {user.username} !</p>
                    <p>
                        + <span className="highlight">{user.score}</span> pts.
                    </p>
                </div>
            </button>

            {isOpen && (
                <div
                    className={`authenticated-user-card__menu ${
                        isOpen ? 'user-card--open' : ''
                    }`}
                >
                    <button onClick={() => disconnect()}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default UserWidget;
