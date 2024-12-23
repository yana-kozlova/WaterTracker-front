// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "https://watertracker-back-i1qk.onrender.com/";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const getUser = createAsyncThunk("users/get", async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     try {
//       setAuthHeader(state.auth.token);
//     const { data } = await axios.get("users/current");
//     return data;
//   } catch (error) {
//     thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const updateUserData = createAsyncThunk(
//   "users/patch",
//     async (credentials, thunkAPI) => {
//       const state = thunkAPI.getState();
//         try {
//         setAuthHeader(state.auth.token);
//       const { data } = await axios.patch("users/current", credentials);
//       return { data };
//     } catch (error) {
//       thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updateUserDailyNorm = createAsyncThunk(
//   "users/dailyNorm",
//   async (credentials, thunkAPI) => {
//     const state = thunkAPI.getState();
//     try {
//       setAuthHeader(state.auth.token);
//       const { data } = await axios.patch("users/water-rate", credentials);
//       return data;
//     } catch (error) {
//       thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updateUserPhoto = createAsyncThunk(
//   "users/avatar",
//     async (credentials, thunkAPI) => {
//       const state = thunkAPI.getState();
//         try {
//         setAuthHeader(state.auth.token);
//       const { data } = await axios.patch("users/avatar", credentials);
//       return data;
//     } catch (error) {
//       thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
