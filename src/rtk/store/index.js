import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../../pages/Menu/Diarys/reducer/diarysSlice";
import editReducer from "../../pages/Menu/Edit/reducer/editSlice";
import signupSlice from "../../pages/Home/reducer/signupSlice";
import profileSlice from "../../pages/Menu/Profile/reducer/profileSlice";
import authSlice from "../../pages/Home/components/Login/reducer/authSlice";

const store = configureStore({
    reducer: {
        edit: editReducer,
        diarys: diaryReducer,
        signup: signupSlice,
        profile: profileSlice,
        auth: authSlice,
    },
});

export default store;
