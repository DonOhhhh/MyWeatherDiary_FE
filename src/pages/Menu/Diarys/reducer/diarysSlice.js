import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 } from "uuid";

const initialState = {
    diarys: [],
    loading: true,
};

export const fetchDiaryGet = createAsyncThunk(
    "diarys/fetchDiaryGet",
    async (page = 0) => {
        const res = await axios.get(`/diary?page=${page}`);
        return res.data;
    }
);

export const fetchDiaryAdd = createAsyncThunk(
    "diarys/fetchDiaryAdd",
    async (body, dispatch) => {
        // const offset = date.getTimezoneOffset() * 60000;
        // const today = new Date(date - offset);
        // const postDate = today.toISOString();
        // body.postDate = postDate;
        const res = await axios.post("/diary", body);
        return res.data;
    }
);
export const fetchDiaryUpdate = createAsyncThunk(
    "diarys/fetchDiaryUpdate",
    async (body, dispatch) => {
        console.log(body);
        const res = await axios.put("/diary", body);
        return res.data;
    }
);

export const fetchDiaryDelete = createAsyncThunk(
    "diarys/fetchDiaryDelete",
    async (postId, dispatch) => {
        console.log(postId);
        const res = await axios.delete(`/diary/${postId}`);
        return res.data;
    }
);

const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {
        diaryAdd: (state, action) => {
            const diary = action.payload;
            state.diarys.push({
                ...diary,
                id: v4(),
            });
        },
        diaryUpdate: (state, action) => {
            state.diarys = state.diarys.map((diary) =>
                diary.id === action.payload.id ? action.payload : diary
            );
            return state;
        },
        diaryDelete: (state, action) => {
            state.diarys = state.diarys.filter(
                (diary) => diary.id !== action.payload.id
            );
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDiaryGet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryGet.fulfilled, (state, action) => {
            state.loading = false;
            state.diarys = action.payload.data
                .slice()
                .sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
            state.error = "";
        });
        builder.addCase(fetchDiaryGet.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(fetchDiaryAdd.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryAdd.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchDiaryAdd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(fetchDiaryUpdate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryUpdate.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.error = "";
        });
        builder.addCase(fetchDiaryUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(fetchDiaryDelete.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryDelete.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.status);
            state.error = "";
        });
        builder.addCase(fetchDiaryDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export default diarysSlice.reducer;
export const { diaryAdd, diaryUpdate, diaryDelete } = diarysSlice.actions;
