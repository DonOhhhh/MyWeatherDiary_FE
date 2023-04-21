import { createSlice } from "@reduxjs/toolkit";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

export const make_2digit = (n) => (n < 10 ? "0" + n : n);

const initialState = {
    calendar: [],
};

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        makeFakeData: (state, { payload: startDate }) => {
            const result = [];
            let s_date_obj = new Date(startDate);
            s_date_obj.setDate(s_date_obj.getDate() - 1);
            for (let i = 0; i < 366; i++) {
                s_date_obj.setDate(s_date_obj.getDate() + 1);
                result.push({
                    date_format: `${
                        new Date(s_date_obj).toISOString().split("T", 1)[0]
                    }`,
                    emotion: getRandomIntInclusive(0, 4) + "",
                    selected: false,
                });
            }
            state.calendar = result;
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
    },
});

export default activitySlice.reducer;
export const { makeFakeData, check, clearSelected } = activitySlice.actions;
