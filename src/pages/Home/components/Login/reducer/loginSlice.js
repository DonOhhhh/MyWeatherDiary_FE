import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    token: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
});
