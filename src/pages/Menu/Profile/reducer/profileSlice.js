import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    diaryTitle: "",
    email: "",
    job: "",
    sns: {
        instagram: "",
        facebook: "",
        twitter: "",
        github: "",
    },
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            return action.payload;
        },
    },
});

export default profileSlice.reducer;
export const { updateProfile } = profileSlice.actions;
