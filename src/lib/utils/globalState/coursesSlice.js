import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    globalStateCoursesArr: [],
};

export const coursesReducer = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, payload) => {
            state.globalStateCoursesArr.push(payload.payload);
        },
    },
});

export const { setCourses } = coursesReducer.actions;

export default coursesReducer.reducer;
