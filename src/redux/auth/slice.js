import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refreshUser,
  loginWithGoogle,

  // fetchUserInfo,
  // updateUserInfo,
  // updateUserAvatar,
  // updateUserEmail,
  // updateUserPassword,
  getUser,
  updateUserData,
  updateUserDailyNorm,
  updateUserPhoto
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    gender: "woman",
    avatarUrl: null,
    dailyNorm: 2000,
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
      // _____________________________settingModal_____________________________

      // Отримання даних користувача
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Оновлення інформації користувача
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const updatedData = action.payload.data;
        state.user = {
          ...state.user,
          ...updatedData,
        };
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Оновлення аватару
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        console.log("Avatar updated response:", action.payload);
        const updatedAvatar = action.payload.data.avatar_url;
        if (updatedAvatar) {
          state.user.avatar = updatedAvatar;
        } else {
          console.error("No avatar URL returned from API.");
        }
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //оновлення пошти користувача
      .addCase(updateUserEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (state.user) {
          state.user.email = action.payload.email;
        }
      })
      //оновлення пароля користувача
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // _________________________UserAddCases_______________________________________

      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserDailyNorm.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user.dailyNorm = action.payload.data.dailyNorm;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user.avatarUrl = action.payload.data.avatar_url;
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
          updateUserPhoto.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const authReducer = slice.reducer;


