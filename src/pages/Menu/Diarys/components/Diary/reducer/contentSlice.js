import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    id: "",
    img: "",
    comment: "",
};

export const fetchContentImg = createAsyncThunk(
    "content/fetchContentImg",
    async (contentId) => {
        const res = await axios.get(`/diary/content/${contentId}`);
        return res.data;
    }
);

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContentImg.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchContentImg.fulfilled, (state, action) => {
            state.loading = false;
            state.img = action.payload.data;
            state.error = "";
        });
        builder.addCase(fetchContentImg.pending, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export default contentSlice.reducer;
