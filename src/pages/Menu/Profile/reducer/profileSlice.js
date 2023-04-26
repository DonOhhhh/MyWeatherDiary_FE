import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    nickName: "",
    diaryTitle: "",
};

export const getUser = createAsyncThunk(
    "profile/getUser",
    async (_, { rejectWithValue }) => {
        try {
            if (!axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${sessionStorage.getItem("token")}`;
            }
            const res = await axios.get("" + `/user/auth`);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "profile/updateUser",
    async (body) => {
        if (!axios.defaults.headers.common.Authorization) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${sessionStorage.getItem("token")}`;
        }
        return await axios.put("" + `/user/auth`, body).then((res) => res.data);
    }
);

export const deleteUser = createAsyncThunk("profile/deleteUser", async () => {
    try {
        if (!axios.defaults.headers.common.Authorization) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${sessionStorage.getItem("token")}`;
        }
        const res = await axios.delete("" + `/user/auth`);
        if (res.status === 200) {
            sessionStorage.removeItem("token");
            console.log("토큰이 지워졌습니다.");
        }
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            const { nickName, diaryTitle } = action.payload.data;
            state.nickName = nickName;
            state.diaryTitle = diaryTitle;
            state.error = "";
        });
        builder.addCase(getUser.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.nickName = "";
            state.diaryTitle = "";
            state.error = action.error.message;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            const { nickName, diaryTitle } = action.payload.data;
            state.nickName = nickName;
            state.diaryTitle = diaryTitle;
            state.error = "";
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.nickName = "";
            state.diaryTitle = "";
            state.error = action.error.message;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.diaryTitle = "";
            state.nickName = "";
            state.error = "";
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log(axios.defaults.headers.common.Authorization);
            console.log(action.error);
        });
    },
});

export default profileSlice.reducer;
export const { updateProfile } = profileSlice.actions;
