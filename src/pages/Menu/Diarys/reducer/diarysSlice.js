import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 } from "uuid";

const initialState = {
    diarys: [],
};

export const getTimeline = createAsyncThunk(
    "diarys/getTimeline",
    async (page = 0) => {
        return axios.get(`/diary?page=${page}`).then((res) => res.data);
    }
);

export const fetchDiaryAdd = createAsyncThunk(
    "diarys/fetchDiaryAdd",
    async (body) => {
        return axios.post("/diary", body).then((res) => res.data);
    }
);

const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {
        diaryAdd: (state, action) => {
            state.diarys.push({
                ...action.payload,
                id: v4(),
            });
        },
        diaryUpdate: (state, action) => {
            return state.diarys.map((diary) =>
                diary.id === action.payload.id ? action.payload : diary
            );
        },
        diaryDelete: (state, action) => {
            return state.diarys.filter(
                (diary) => diary.id !== action.payload.id
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTimeline.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTimeline.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.data);
            // state = [...state, ...action.payload.data];
            state.error = "";
        });
        builder.addCase(getTimeline.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log(state.error);
        });
        builder.addCase(fetchDiaryAdd.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryAdd.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.data);
            // state = [...state, ...action.payload.data];
            state.error = "";
        });
        builder.addCase(fetchDiaryAdd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log(state.error);
        });
    },
});

export default diarysSlice.reducer;
export const { diaryAdd, diaryUpdate, diaryDelete } = diarysSlice.actions;
