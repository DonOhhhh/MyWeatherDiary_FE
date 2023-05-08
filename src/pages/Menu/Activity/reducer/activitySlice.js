import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

const makeInitialCalendar = (startDate = "2023-01-01") => {
    const result = [];
    let s_date_obj = new Date(startDate);
    s_date_obj.setDate(s_date_obj.getDate() - 1);
    for (let i = 0; i < 365; i++) {
        s_date_obj.setDate(s_date_obj.getDate() + 1);
        result.push({
            date_format: `${
                new Date(s_date_obj).toISOString().split("T", 1)[0]
            }`,
            emotion: 0 + "",
            selected: false,
            id: "",
        });
    }
    return result;
};

const EmotionToNum = {
    HAPPY: "1",
    SAD: "2",
    NEUTRAL: "3",
    ANGER: "4",
};

const initialState = {
    calendar: makeInitialCalendar(),
    exportData: [],
};

export const fetchCalendar = createAsyncThunk(
    "activity/fetchCalendar",
    async (year, { rejectWithValue }) => {
        try {
            if (!axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${sessionStorage.getItem("token")}`;
            }
            const result = await axios.get("" + `/diary/activity/${year}`);
            return result.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Axios Cancelled by cancel signal");
            }
            return rejectWithValue("fetchCalendar cancelled!");
        }
    }
);

export const fetchSelectedDiarys = createAsyncThunk(
    "activity/fetchSelectedDiarys",
    async (data, { rejectWithValue }) => {
        try {
            if (!axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${sessionStorage.getItem("token")}`;
            }
            const res = await axios.post("" + `/diary/activity`, data);
            return res.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Axios cancelled by cancel signal");
            }
            return rejectWithValue("fetchSelectedDiarys cancelled!");
        }
    }
);

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        makeFakeData: (state, { payload: startDate }) => {
            state.loading = true;
            state.calendar = makeInitialCalendar(startDate);
            state.loading = false;
            return state;
        },
        check: (state, { payload: date }) => {
            state.calendar = state.calendar.map((e) =>
                e.date_format === date ? { ...e, selected: !e.selected } : e
            );
            return state;
        },
        clearSelected: (state) => {
            state.calendar = state.calendar.map((e) => ({
                ...e,
                selected: false,
            }));
            return state;
        },
        clearExportData: (state) => {
            state.exportData = [];
            return state;
        },
        setLoading: (state) => {
            state.exportLoading = true;
            return state;
        },
        setLoaded: (state) => {
            state.exportLoading = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCalendar.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCalendar.fulfilled, (state, action) => {
            state.loading = false;
            const data = {};
            console.log(action.payload);
            action.payload.forEach(({ id, emotion, postDate }) => {
                data[postDate.split(" ", 1)[0]] = {
                    emotion: EmotionToNum[emotion],
                    id,
                };
            });
            // console.log(`fetchCalendar : ${JSON.stringify(data)}`);
            state.calendar = state.calendar.map(
                ({ date_format, emotion, selected, id }) => {
                    if (data[date_format]) {
                        return {
                            date_format,
                            emotion: data[date_format].emotion,
                            selected,
                            id: data[date_format].id,
                        };
                    } else {
                        return {
                            date_format,
                            emotion,
                            selected,
                            id,
                        };
                    }
                }
            );
            state.error = "";
        });
        builder.addCase(fetchCalendar.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchSelectedDiarys.pending, (state, action) => {
            state.exportLoading = true;
        });
        builder.addCase(fetchSelectedDiarys.fulfilled, (state, action) => {
            console.log("fetchSelectedDiarys fulfilled!");
            state.exportData = action.payload.data;
            state.exportLoading = false;
            state.error = "";
        });
        builder.addCase(fetchSelectedDiarys.rejected, (state, action) => {
            console.log(action);
            state.exportLoading = false;
            state.error = action.payload;
        });
    },
});

export default activitySlice.reducer;
export const {
    makeFakeData,
    check,
    clearSelected,
    clearExportData,
    setLoading,
    setLoaded,
} = activitySlice.actions;
