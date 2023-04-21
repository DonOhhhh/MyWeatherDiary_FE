import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: "",
    enterKey: "",
};

export const loginReq = createAsyncThunk("login/loginReq", async (enterKey) => {
    return await axios
        .post("/user/login", {
            enterKey,
        })
        .then((res) => res.data);
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToken: (state, action) => {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${state.token}`;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginReq.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginReq.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.data.token;
            state.error = "";
        });
        builder.addCase(loginReq.rejected, (state, action) => {
            state.loading = false;
            state.token = "";
            state.error = action.error.message;
        });
    },
});

export default loginSlice.reducer;
export const { setToken } = loginSlice.actions;
