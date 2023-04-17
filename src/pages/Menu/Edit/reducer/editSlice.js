import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
    id: "",
    date: "",
    emotion: "1",
    contents: [
        {
            id: v4(),
            imgSrc: "",
            comment: "",
        },
    ],
};

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        diaryImport: (_, action) => {
            return action.payload;
        },
        clear: () => {
            return initialState;
        },
    },
});

export default editSlice.reducer;
export const { diaryImport, clear } = editSlice.actions;
