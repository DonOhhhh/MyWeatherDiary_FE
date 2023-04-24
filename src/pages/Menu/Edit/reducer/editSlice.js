import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
    id: "",
    postDate: new Date().toISOString(),
    emotion: "1",
    contents: [
        {
            id: v4(),
            img: "",
            comment: "",
        },
    ],
};

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        diaryImport: (state, action) => {
            state = action.payload;
            if (!state.contents.length) {
                state.contents = [
                    {
                        id: v4(),
                        img: "",
                        comment: "",
                    },
                ];
            }
            return state;
        },
        clear: () => {
            return initialState;
        },
    },
});

export default editSlice.reducer;
export const { diaryImport, clear } = editSlice.actions;
