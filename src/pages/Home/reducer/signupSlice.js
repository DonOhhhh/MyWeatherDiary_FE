import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: "",
    diaryTitle: "",
    enterKey: "",
};

export const fetchKey = createAsyncThunk(
    "signup/generate",
    async (dispatch, getState) => {
        const { signup } = getState.getState();
        const { diaryTitle } = signup;
        return await axios
            .post(`${import.meta.env.VITE_BASE_URL}/user`, {
                role: 1,
                diaryTitle,
            })
            .then((res) => res.data);
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setDiaryTitle: (state, action) => {
            state.diaryTitle = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchKey.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchKey.fulfilled, (state, action) => {
            state.loading = false;
            state.enterKey = action.payload.data.enterKey;
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
export const { setDiaryTitle } = signupSlice.actions;
