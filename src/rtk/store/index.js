import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../../pages/Menu/Diarys/reducer/diarysSlice";
import editReducer from "../../pages/Menu/Edit/reducer/editSlice";
import signupSlice from "../../pages/Home/reducer/signupSlice";
import profileSlice from "../../pages/Menu/Profile/reducer/profileSlice";
import activitySlice from "../../pages/Menu/Activity/reducer/activitySlice";
import loginSlice from "../../pages/Home/reducer/loginSlice";
import contentSlice from "../../pages/Menu/Diarys/components/Diary/reducer/contentSlice";

const store = configureStore({
    reducer: {
        edit: editReducer,
        diarys: diaryReducer,
        signup: signupSlice,
        login: loginSlice,
        profile: profileSlice,
        activity: activitySlice,
        content: contentSlice,
    },
});

export default store;
