import { useState } from 'react';
import {
    SignIn,
    SignUp,
    checkUserByUsername,
} from '../../lib/actions/user.actions';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
    setIsAuthenticated,
    setIsInstructor,
    setUser,
} from '../../lib/utils/globalState/userSlice';

const Identify = ({ setIsOpen }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [step, setStep] = useState(1);
    const [existingAccount, setExistingAccount] = useState(false);
    const [error, setError] = useState({
        username: false,
        email: false,
        password: false,
    });
    const [errorMsg, setErrorMsg] = useState('');

    const handleUsernameChange = () => {
        setUsername(null);
        setExistingAccount(false);
        setStep(1);
        setPassword(null);
    };

    const handlePasswordValidation = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailValidation = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (step === 1) {
            // Étape 1: Vérification => Est-ce que votre compte existe déjà ?
            const checkUser = async () => {
                return await checkUserByUsername(username).then((res) =>
                    res.json()
                );
            };

            checkUser().then((res) => {
                if (res.userExists) setExistingAccount(true);
                setStep(2);
            });
        } else {
            // Étape 2: Validation => Si votre compte existe déjà, Connectez-vous. Sinon, Créez un compte !
            if (existingAccount) {
                const payload = {
                    username: event.target[0].value,
                    password: event.target[2].value,
                };

                const connection = async () => {
                    return await SignIn(payload).then((res) => res.json());
                };

                const connectionPromise = connection().then((res) => {
                    if (res.token) {
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.token)
                        );
                        localStorage.setItem(
                            'refreshToken',
                            JSON.stringify(res.refreshToken)
                        );
                        localStorage.setItem('user', JSON.stringify(res.user));
                        dispatch(setUser(res.user));
                        dispatch(setIsAuthenticated(true));
                        setIsOpen(false);
                        if (res.user.isInstructor)
                            dispatch(setIsInstructor(res.user.isInstructor));
                    }
                });

                toast.promise(connectionPromise, {
                    loading: 'Looking for your account...',
                    success: 'You are connected !',
                    error: 'We are unable to connect you.',
                });
            } else {
                const payload = {
                    username: event.target[0].value,
                    email: event.target[2].value,
                    password: event.target[3].value,
                };

                const registration = async () => {
                    return await SignUp(payload).then((res) => res.json());
                };

                const registerPromise = registration().then((res) => {
                    if (res.token) {
                        localStorage.setItem('user', JSON.stringify(res.user));
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.token)
                        );
                        localStorage.setItem(
                            'refreshToken',
                            JSON.stringify(res.refreshToken)
                        );
                        dispatch(setUser(res.user));
                        dispatch(setIsAuthenticated(true));
                        setIsOpen(false);
                    }
                });

                toast.promise(registerPromise, {
                    loading: 'Creating your account...',
                    success: 'Account created !',
                    error: 'We are unable to create your account.',
                });
            }
        }
    };

    return (
        <>
            {step === 1 ? (
                <h4 className="login-panel__heading">
                    identify :<span>(or choose a username)</span>
                </h4>
            ) : existingAccount ? (
                'Sign Into your account :'
            ) : (
                'Create an account :'
            )}

            <form className="login-panel__form" onSubmit={handleSubmit}>
                <div className="login-panel__username-container">
                    <input
                        id="username-input"
                        className={`input ${
                            step === 2 ? 'input--disabled' : 'input--default'
                        }`}
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value.trim())}
                        value={username ?? ''}
                        disabled={step === 2}
                        autoComplete="username"
                        autoFocus
                        required
                    />
                    {error.username && <p>{errorMsg}</p>}
                    {step === 2 && (
                        <button
                            className="btn btn--tertiary login-panel__username-change-btn"
                            type="reset"
                            onClick={() => handleUsernameChange()}
                        >
                            Change
                        </button>
                    )}
                </div>
                {step === 2 && (
                    <>
                        {!existingAccount && (
                            <div className="login-panel__email-container">
                                <input
                                    id="email-input"
                                    className="input input--default"
                                    type="email"
                                    value={email ?? ''}
                                    onChange={handleEmailValidation}
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="E-mail"
                                    required
                                />
                                {error.email && <p>{errorMsg}</p>}
                            </div>
                        )}
                        <div className="login-panel__password-container">
                            <input
                                id="password-input"
                                className="input input--default"
                                type="password"
                                placeholder="Password"
                                value={password ?? ''}
                                onChange={handlePasswordValidation}
                                autoFocus={existingAccount}
                                required
                                autoComplete={
                                    existingAccount
                                        ? 'current-password'
                                        : 'new-password'
                                }
                            />
                            {error.password && <p>{errorMsg}</p>}
                        </div>
                    </>
                )}
                <button
                    className={`btn btn--primary ${
                        step === 1
                            ? !username && 'disabled'
                            : !password && 'disabled'
                    }`}
                    disabled={step === 1 ? !username : !password}
                >
                    {step === 1
                        ? 'Continue'
                        : 'Sign ' + (existingAccount ? 'In' : 'Up')}
                </button>
            </form>
            {existingAccount ? (
                <button className="btn btn--tertiary">Forgot Password ?</button>
            ) : (
                <button className="btn btn--tertiary">Troubles ?</button>
            )}
        </>
    );
};

export default Identify;

// const regex = new RegExp('^[A-Za-z0-9]{3,20}$');
// if (regex.test(username)) {
//     const accountExists = username && GetUserByUsername(username);
//     setExistingAccount(!!accountExists);
//     setStep(2);
//     setError({ ...error, username: false });
//     setErrorMsg('');
// } else {
//     setError({ ...error, username: true });
//     setErrorMsg('Only alphanumeric characters !');
// }

// const emailRegex = new RegExp(
//     '/^([a-zd.-]+)@([a-zd-]+).([a-z]{2,8})(.[a-z]{2,8})?$/'
// );
// const passwordRegex = new RegExp(
//     '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'
// );

// if (emailRegex.test(email)) {
//     const accountExists = username && GetUserByUsername(username);
//     setExistingAccount(!!accountExists);
//     setStep(2);
//     setError(false);
//     setErrorMsg('');
// } else {
//     setError({ ...error, email: true });
//     setErrorMsg('Enter a valid email address');
//     return;
// }

// if (passwordRegex.test(password)) {
//     const accountExists = username && GetUserByUsername(username);
//     setExistingAccount(!!accountExists);
//     setStep(2);
//     setError(false);
//     setErrorMsg('');
// } else {
//     setError({ ...error, password: true });
//     setErrorMsg(
//         '8-32 characters with 1 lowercase, 1 uppercase, 1 special character'
//     );
//     return;
// }
