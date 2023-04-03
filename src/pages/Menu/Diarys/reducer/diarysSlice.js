import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {
        diaryAdd: (state, action) => {
            state.push(action.payload);
            return state.sort((a, b) =>
                new Date(b.date) - new Date(a.date) ? 1 : -1
            );
        },
        diaryUpdate: (state, action) => {
            return state.map((diary) =>
                diary.id === action.payload.id ? action.payload : diary
            );
        },
        diaryDelete: (state, action) => {
            return state.filter((diary) => diary.id !== action.payload.id);
        },
    },
});

export default diarysSlice.reducer;
export const { diaryAdd, diaryUpdate, diaryDelete } = diarysSlice.actions;
