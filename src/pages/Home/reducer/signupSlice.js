import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: "",
    diaryTitle: "",
    enterKey: "",
};

export const fetchKey = createAsyncThunk(
    "signup/generate",
    async (diaryTitle) => {
        console.log(axios.defaults.baseURL);
        const res = await axios.post(`/proxy/user`, {
            role: 1,
            diaryTitle,
        });
        return res.data;
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchKey.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchKey.fulfilled, (state, action) => {
            state.loading = false;
            state.enterKey = action.payload.data.enterKey;
            state.diaryTitle = "";
            state.error = "";
        });
        builder.addCase(fetchKey.rejected, (state, action) => {
            state.loading = false;
            state.enterKey = "";
            state.error = action.error.message;
        });
    },
});

export default signupSlice.reducer;
export const {} = signupSlice.actions;
