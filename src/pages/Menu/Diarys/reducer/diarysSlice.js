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
            console.log(state.map((diary) => diary.id));
            console.log(action.payload);
            return state.map((diary) =>
                diary.id === action.payload.id ? action.payload : diary
            );
        },
        diaryDelete: (state, action) => {
            const index = state.findIndex(
                (diary) => diary.id === action.payload.id
            );
            if (index > -1) state.splice(index, 1);
        },
    },
});

export default diarysSlice.reducer;
export const { diaryAdd, diaryUpdate, diaryDelete } = diarysSlice.actions;
