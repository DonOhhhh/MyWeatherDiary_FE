import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../../pages/Menu/Diarys/reducer/diarysSlice";
import editReducer from "../../pages/Menu/Edit/reducer/editSlice";
import signupSlice from "../../pages/Home/reducer/signupSlice";
import profileSlice from "../../pages/Menu/Profile/reducer/profileSlice";
import authSlice from "../../pages/Home/components/Login/reducer/authSlice";
import activitySlice from "../../pages/Menu/Activity/reducer/activitySlice";
import loginSlice from "../../pages/Home/reducer/loginSlice";

const store = configureStore({
    reducer: {
        edit: editReducer,
        diarys: diaryReducer,
        signup: signupSlice,
        login: loginSlice,
        profile: profileSlice,
        auth: authSlice,
        activity: activitySlice,
    },
});

export default store;
