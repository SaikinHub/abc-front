import { useState } from 'react';
import Identify from '../forms/Identify';

const LoginWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="login-widget__wrapper">
            <button
                className={`login-widget ${
                    isOpen ? 'login-widget--isOpen' : 'login-widget--isNotOpen'
                }`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? (
                    <img src="/assets/svg/active-user.svg" alt="user icon" />
                ) : (
                    <img src="/assets/svg/user.svg" alt="user icon" />
                )}
            </button>

            {isOpen && (
                <div className="login-panel">
                    <div>
                        <img
                            className="login-panel__logo"
                            src="/assets/svg/logo.svg"
                            alt="logo de abclassrooms"
                        />
                    </div>
                    <Identify setIsOpen={setIsOpen} />
                </div>
            )}
        </div>
    );
};

export default LoginWidget;
