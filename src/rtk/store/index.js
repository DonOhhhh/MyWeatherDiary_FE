import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../../pages/Menu/Diarys/reducer/diarysSlice";
import editReducer from "../../pages/Menu/Edit/reducer/editSlice";

const store = configureStore({
    reducer: {
        edit: editReducer,
        diarys: diaryReducer,
    },
});

export default store;
