import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      //Registration
      .addCase(register.fulfilled, (state, action) => {
        // state.user = action.payload.user;
        // state.token = action.payload.token;
        // state.isLoggedIn = true;
      })
      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      //Logout
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, () => {        
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
      });
  },
});

export const authReducer = slice.reducer;

// name: null,
// email: null,
// gender: "femail",
// avatarUrl: null,
// daylyNorm: 2000,
// password:null,
// createdAt:null,
// updatedAt:null,
// _id:null,
