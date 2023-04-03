import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: "",
    diaryTitle: "",
    key: "",
};

export const fetchKey = createAsyncThunk(
    "signup/generate",
    async (arg, { getState }) => {
        const { email, diaryTitle } = getState();
        await axios
            .post("url", { email, diaryTitle })
            .then((res) => res.data)
            .catch((error) => error);
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        getKey: (state, action) => {
            action.payload.key = "TestKey";
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchKey.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchKey.fulfilled, (state, action) => {
            state.loading = false;
            state.key = action.payload.enterKey;

            state.error = "";
        });
        builder.addCase(fetchKey.rejected, (state, action) => {
            state.loading = false;
            state.key = "";
            state.error = action.error.message;
        });
    },
});

export default signupSlice.reducer;
export const { getKey } = signupSlice.actions;
