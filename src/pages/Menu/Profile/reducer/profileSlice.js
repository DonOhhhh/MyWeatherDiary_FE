import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "오동준",
    diaryTitle: "일기",
    email: "aaaa@a.com",
    job: "괴발자",
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
