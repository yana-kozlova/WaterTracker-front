import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, login,logout} from "./operations";

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
      .addCase(register.pending, (state) => {})
      
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.error = true;
      })
      //Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
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
        state.isLoggedIn = false;
        state.error = true;
      })
      //Refresh
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state) => {
        state.isLoggedIn = true;
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.rejected, logout.rejected), (state) => {
        state.isLoading = false;
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
