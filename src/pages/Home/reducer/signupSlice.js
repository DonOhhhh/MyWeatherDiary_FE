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
        const res = await axios.post("" + `/user`, {
            role: 1,
            diaryTitle,
        });
        return res.data;
    }
);

export const sendEmail = createAsyncThunk(
    "signup/sendKey",
    async ({ email }, { getState, rejectWithValue }) => {
        const { diaryTitle, enterKey } = getState().signup;
        try {
            const res = await axios.post("" + `/email`, {
                receiver: email,
                enterKey,
                diaryTitle,
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue("Send failed!");
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchKey.pending, (state) => {
            state.fetchKeyLoading = true;
        });
        builder.addCase(fetchKey.fulfilled, (state, action) => {
            state.fetchKeyLoading = false;
            const { enterKey, diaryTitle } = action.payload.data;
            state.enterKey = enterKey;
            state.diaryTitle = diaryTitle;
            state.error = "";
        });
        builder.addCase(fetchKey.rejected, (state, action) => {
            state.fetchKeyLoading = false;
            state.enterKey = "";
            state.error = action.error.message;
        });
        builder.addCase(sendEmail.pending, (state) => {
            state.emailLoading = true;
        });
        builder.addCase(sendEmail.fulfilled, (state) => {
            state.emailLoading = false;
            state.error = "";
        });
        builder.addCase(sendEmail.rejected, (state, action) => {
            state.emailLoading = false;
            state.error = action.error.message;
        });
    },
});

export default signupSlice.reducer;
export const {} = signupSlice.actions;
