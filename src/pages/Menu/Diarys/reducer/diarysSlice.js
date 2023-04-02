import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {
        added: (state, action) => {
            state.push(action.payload);
            return state.sort((a, b) =>
                new Date(b.date) - new Date(a.date) ? 1 : -1
            );
        },
        updated: (state, action) => {
            state = state.map((diary) =>
                diary.id === action.payload.id ? action.payload : diary
            );
        },
        deleted: (state, action) => {
            const index = state.findIndex(
                (diary) => diary.id === action.payload.id
            );
            if (index > -1) state.splice(index, 1);
        },
    },
});

export default diarysSlice.reducer;
export const { added, updated, deleted } = diarysSlice.actions;
