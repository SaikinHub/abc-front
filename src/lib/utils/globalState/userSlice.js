import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userObj: null,
    isAuthenticated: false,
    isInstructor: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, payload) => {
            state.userObj = payload.payload;
        },
        setIsAuthenticated: (state, payload) => {
            state.isAuthenticated = payload.payload;
        },
        setIsInstructor: (state, payload) => {
            state.isInstructor = payload.payload;
        },
        resetUser: (state) => {
            state.userObj = null;
            state.isAuthenticated = false;
            state.isInstructor = false;
        },
    },
});

export const { setUser, setIsAuthenticated, setIsInstructor, resetUser } =
    userSlice.actions;

export default userSlice.reducer;
