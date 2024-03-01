export const checkUserByUsername = async (username) => {
    const payload = {
        username: username,
    };
    return await fetch('http://localhost:3005/auth/checkUsername', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
};

export const SignIn = async (inputs) => {
    return await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
    });
};

export const SignUp = async (inputs) => {
    return await fetch('http://localhost:3005/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
    });
};

export const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) return;
    const payload = { refreshToken: JSON.parse(token) };
    return await fetch('http://localhost:3005/auth/refreshToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
};

export const getUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    return await fetch('http://localhost:3005/auth/getUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(token),
        },
    });
};

export const getUserInfos = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    return await fetch('http://localhost:3005/auth/getUserInfos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(token),
        },
    });
};

export const updateUserInfos = async (inputs) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const payload = {
        username: inputs.username,
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        birthdate: inputs.birthdate,
        email: inputs.email,
        phone: inputs.phone,
        birthdate: inputs.birthdate,
        profilePicture: inputs.avatarUrl,
    };

    return await fetch('http://localhost:3005/auth/updateUserInfos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(token),
        },
        body: JSON.stringify(payload),
    });
};

export const getUserLastUpdate = async (inputs) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    return await fetch('http://localhost:3005/auth/getUserLastUpdate', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(token),
        },
    });
};
