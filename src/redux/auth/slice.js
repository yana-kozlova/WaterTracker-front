import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
    gender: "femail",
    avatarUrl: null,
    daylyNorm: 2000,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

// user

//  -isLogedIn
//  -user
//   -email
//   -avatarUrl
//   -daylyNorm
//   -gender
//   -name

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder




    // _________________Registration_________________
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })




      // _________________Login_________________
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })




        // _________________Logout_________________
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, () => {
        state.isLoggedIn = false;
      })

    // _________________Refresh_________________
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

    // // .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
    // //   state.isLoggedIn = true;
    // // })
    // .addMatcher(isAnyOf(register.rejected, logout.rejected), (state) => {
    //   state.isLoggedIn = false;
    // });
  },
});

export const authReducer = slice.reducer;
