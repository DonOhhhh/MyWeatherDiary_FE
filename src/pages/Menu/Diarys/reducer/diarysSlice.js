import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 } from "uuid";

const initialState = {
    diarys: [],
    loading: false,
    isEnd: false,
    page: 0,
};

const NumToEmotion = {
    1: "HAPPY",
    2: "SAD",
    3: "NEUTRAL",
    4: "ANGER",
};

export const fetchDiaryGet = createAsyncThunk(
    "diarys/fetchDiaryGet",
    async (dispatch, getState) => {
        if (!axios.defaults.headers.common.Authorization) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${sessionStorage.getItem("token")}`;
        }
        const { page } = getState.getState().diarys;
        console.log(page);
        const res = await axios.get("" + `/diary?page=${page}`);
        return res.data;
    }
);

export const fetchDiaryAdd = createAsyncThunk(
    "diarys/fetchDiaryAdd",
    async (body, { rejectWithValue }) => {
        try {
            if (!axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${sessionStorage.getItem("token")}`;
            }
            let { postDate, emotion, contents } = body;
            const data = {
                postDate:
                    typeof postDate === "string"
                        ? postDate.slice(0, 19)
                        : postDate.toISOString().slice(0, 19),
                emotion: NumToEmotion[emotion],
                contents,
            };
            console.log(data);
            const res = await axios.post("" + `/diary`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const fetchDiaryUpdate = createAsyncThunk(
    "diarys/fetchDiaryUpdate",
    async (body, { rejectWithValue }) => {
        try {
            if (!axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${sessionStorage.getItem("token")}`;
            }
            const { id, postDate, emotion, contents } = body;
            const today = new Date(
                new Date(postDate).getTime() + 1000 * 60 * 60 * 9
            );
            const data = {
                postId: id,
                postDate: today.toISOString().slice(0, 19),
                emotion: NumToEmotion[emotion],
                contents,
            };
            console.log(data);
            const res = await axios.put("" + `/diary`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDiaryDelete = createAsyncThunk(
    "diarys/fetchDiaryDelete",
    async (postId, { rejectWithValue }) => {
        try {
            if (!axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${sessionStorage.getItem("token")}`;
            }
            const res = await axios.delete("" + `/diary/${postId}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

const diarysSlice = createSlice({
    name: "diarys",
    initialState,
    reducers: {
        diaryClear: (state, action) => {
            state.diarys = [];
            state.page = 0;
            return state;
        },
        pageInc: (state, action) => {
            state.page += 1;
        },
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
            if (action.payload.data.length) {
                state.page += 1;
                const newDiaryCollection = action.payload.data
                    .slice()
                    .sort(
                        (a, b) => new Date(b.postDate) - new Date(a.postDate)
                    );
                state.diarys.push(...newDiaryCollection);
            } else {
                state.isEnd = true;
            }
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
            state.page = 0;
            state.diarys = [];
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
            state.page = 0;
            state.diarys = [];
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
            state.error = "";
        });
        builder.addCase(fetchDiaryDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export default diarysSlice.reducer;
export const { diaryClear, pageInc } = diarysSlice.actions;
