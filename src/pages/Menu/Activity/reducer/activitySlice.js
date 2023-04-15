import { createSlice } from "@reduxjs/toolkit";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

export const make_2digit = (n) => (n < 10 ? "0" + n : n);

const initialState = [];

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        makeFakeData: (_, { payload: startDate }) => {
            const result = [];
            let s_date_obj = new Date(Date.parse(startDate));
            s_date_obj.setDate(s_date_obj.getDate() - 1);
            for (let i = 0; i < 366; i++) {
                s_date_obj.setDate(s_date_obj.getDate() + 1);
                const year = s_date_obj.getFullYear();
                const month = make_2digit(Number(s_date_obj.getMonth() + 1));
                const date = make_2digit(Number(s_date_obj.getDate()));
                result.push({
                    date_format: `${year}-${month}-${date}`,
                    contentsNum: getRandomIntInclusive(0, 10),
                    emotion: getRandomIntInclusive(0, 4) + "",
                });
            }
            return result;
        },
    },
});

export default activitySlice.reducer;
export const { makeFakeData } = activitySlice.actions;
