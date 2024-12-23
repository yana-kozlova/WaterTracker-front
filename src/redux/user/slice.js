import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUser,
  updateUserData,
  updateUserDailyNorm,
  updateUserPhoto,
} from "./operations";

const initialState = {
  user: {
    avatarUrl: null,
    name: "",
    email: "",
    gender: "",
    daily_norma: "1800",
  },
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserDailyNorm.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user.daily_norma = action.payload.data.daily_norma;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user.avatarUrl = action.payload.data.avatar_url;
      })
      .addMatcher(
        isAnyOf(
          getUser.pending,
          updateUserData.pending,
          updateUserDailyNorm.pending,
          updateUserPhoto.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getUser.rejected,
          updateUserData.rejected,
          updateUserDailyNorm.rejected,
          updateUserPhoto.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const userReduser = slice.reducer;
