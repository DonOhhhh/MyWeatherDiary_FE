import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
    id: v4(),
    date: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10),
    emotion: 0,
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
        saved: (_, action) => {
            return action.payload;
        },
        cleared: () => {
            return initialState;
        },
    },
});

export default editSlice.reducer;
export const { saved, cleared } = editSlice.actions;
