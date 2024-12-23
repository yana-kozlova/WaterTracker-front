// redux/settingModal/slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserInfo,
  updateUserInfo,
  updateUserAvatar,
  updateUserPassword,
  updateUserEmail,
} from "./operations";

const initialState = {
  user: {
    avatar: null,
    name: "",
    email: "",
    gender: "",
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Отримання даних користувача
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Оновлення інформації користувача
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const updatedData = action.payload.data; 
        state.user = {
          ...state.user,
          ...updatedData,
        };
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Оновлення аватару
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
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
        state.loading = false;
        state.error = action.payload;
      })
      //оновлення пошти користувача
      .addCase(updateUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.user) {
          state.user.email = action.payload.email;
        }
      })
      //оновлення пароля користувача
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const settingModalReducer = userSlice.reducer;
