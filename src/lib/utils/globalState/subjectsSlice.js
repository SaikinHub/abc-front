import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subjectsArr: [],
};

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubjects: (state, payload) => {
            state.subjectsArr = payload.payload;
        },
    },
});

export const { setSubjects } = subjectsSlice.actions;

export default subjectsSlice.reducer;
