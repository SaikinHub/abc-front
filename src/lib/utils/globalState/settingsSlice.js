import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settingsNavTree: [1],
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        pushScreen: (state, payload) => {
            state.settingsNavTree.push(payload.payload);
        },
        popScreen: (state) => {
            state.settingsNavTree.pop();
        },
        resetTree: (state) => {
            state.settingsNavTree = [1];
        },
    },
});

export const { pushScreen, popScreen, resetTree } = settingsSlice.actions;

export default settingsSlice.reducer;
