import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import subjectsReducer from './subjectsSlice';
import coursesReducer from './coursesSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        subjects: subjectsReducer,
        courses: coursesReducer,
        settings: settingsReducer,
    },
});
