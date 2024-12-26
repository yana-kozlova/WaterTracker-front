import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refreshUser,
  loginWithGoogle,
  getUser,
  updateUserData,
  updateUserDailyNorm,
  updateUserPhoto,
  resetPassword,
  updatePassword,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    gender: "woman",
    avatarUrl: null,
    daily_norma: 2000,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: false,
  isRegistered: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      //Registration
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      // Login

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      //Logout
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state) => {
        state.error = true;
      })
      //Refresh
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      //Login with Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.token = action.payload.token;

        state.user = {
          ...state.user,
          ...action.payload.user,
        };
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      //Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      //Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
        state.isRegistered = true;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      // _________________________UserAddCases_______________________________________

      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUserDailyNorm.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user.daily_norma = action.payload.data.daily_norma;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user.avatar_url = action.payload.data.avatar_url;
      })

      //  _____________________________addMatcher_________________________________

      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(register.rejected, logout.rejected), (state) => {
        state.isLoggedIn = false;
      })
      .addMatcher(isAnyOf(login.fulfilled, refreshUser.fulfilled), (state) => {
        state.isLoggedIn = true;
      })
      // _________________________UserAddCases_______________________________________
      .addMatcher(
        isAnyOf(
          getUser.pending,
          updateUserData.pending,
          updateUserDailyNorm.pending,
          updateUserPhoto.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getUser.rejected,
          updateUserData.rejected,
          updateUserDailyNorm.rejected,
          updateUserPhoto.rejected,
        ),
        (state) => {
          state.isLoading = false;
          state.error = true;
        }
      );
  },
});

export const authReducer = slice.reducer;
