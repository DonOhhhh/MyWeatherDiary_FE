import { createSlice, current } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = [];

const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {
        diaryAdd: (state, action) => {
            state.push({ ...action.payload, id: v4() });
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
