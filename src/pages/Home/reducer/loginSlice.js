import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: "",
    username: "",
    enterKey: "",
};

export const loginReq = createAsyncThunk("login/loginReq", async (enterKey) => {
    const res = await axios.post("" + `/user/login`, {
        enterKey,
    });
    return res.data;
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = sessionStorage.getItem("token");
        },
        setAuthorization: (state, action) => {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${sessionStorage.getItem("token")}`;
        },
        clearToken: (state, action) => {
            sessionStorage.removeItem("token");
            state.token = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginReq.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginReq.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.data.token;
            sessionStorage.setItem("token", state.token);
            state.username = action.payload.data.username;
            sessionStorage.setItem("username", state.username);
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
export const { setToken, clearToken, setAuthorization } = loginSlice.actions;
