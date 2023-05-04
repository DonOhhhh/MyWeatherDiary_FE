import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    async (_, { getState, rejectWithValue }) => {
        if (!axios.defaults.headers.common.Authorization) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${sessionStorage.getItem("token")}`;
        }
        const { page } = getState().diarys;
        // console.log(page);
        try {
            const res = await axios.get("" + `/diary?page=${page}`);
            return res.data;
        } catch (thrown) {
            if (axios.isCancel(thrown)) {
                console.log("Axios cancelled by cancel signal");
            }
            return rejectWithValue("FetchDiaryGet failed");
        }
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
            if (typeof postDate !== "string") {
                postDate = new Date(
                    postDate.getTime() + 1000 * 60 * 60 * 9
                ).toISOString();
            }
            contents = contents.map((e, i) => ({ ...e, contentOrder: i }));
            const data = {
                postDate: postDate.slice(0, 19),
                emotion: NumToEmotion[emotion],
                contents,
            };
            console.log(data);
            const res = await axios.post("" + `/diary`, data);
            return res.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Axios cancelled by cancel signal");
            }
            return rejectWithValue("fetchDiaryAdd failed");
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
            let { id, postDate, emotion, contents } = body;
            const today = new Date(
                new Date(postDate).getTime() + 1000 * 60 * 60 * 9
            );
            contents = contents.map((e, i) => ({ ...e, contentOrder: i }));
            const data = {
                postId: id,
                postDate: today.toISOString().slice(0, 19),
                emotion: NumToEmotion[emotion],
                contents,
            };
            console.log("fetchDiaryUpdate");
            console.log(data);
            const res = await axios.put("" + `/diary`, data);
            return res.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Axios cancelled by cancel signal");
            }
            return rejectWithValue("fetchDiaryUpdate failed");
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
            if (axios.isCancel(error)) {
                console.log("Axios cancelled by cancel signal");
            }
            return rejectWithValue("fetchDiaryDelete failed");
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
            state.isEnd = false;
            return state;
        },
        incPage: (state, action) => {
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
            state.isEnd = false;
            console.log(action.payload);
            if (action.payload?.data?.length) {
                // console.log(action.payload.data);
                console.log(`${state.page}번째 page를 fetch 했습니다!`);
                state.diarys.push(...action.payload.data);
                state.diarys.sort(
                    (a, b) => new Date(b.postDate) - new Date(a.postDate)
                );
            } else {
                state.isEnd = true;
                console.log("Diary Ended!");
            }
            state.error = "";
        });
        builder.addCase(fetchDiaryGet.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchDiaryAdd.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryAdd.fulfilled, (state, action) => {
            state.loading = false;
            state.page = 0;
            state.diarys = [];
            state.isEnd = false;
            state.error = "";
        });
        builder.addCase(fetchDiaryAdd.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchDiaryUpdate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryUpdate.fulfilled, (state, action) => {
            state.loading = false;
            state.page = 0;
            state.diarys = [];
            state.isEnd = false;
            state.error = "";
        });
        builder.addCase(fetchDiaryUpdate.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchDiaryDelete.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiaryDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.isEnd = false;
            state.error = "";
        });
        builder.addCase(fetchDiaryDelete.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default diarysSlice.reducer;
export const { diaryClear, incPage } = diarysSlice.actions;
