// import { createAsyncThunk } from "@reduxjs/toolkit";


// createAsyncThunk(type, payloadCreator)

// axios.defaults.baseURL = "https://connections-api.goit.global/";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };


// export const register = createAsyncThunk(
//     "auth/register",
//     async (credentials, thunkAPI) => {
//       try {
//         const { data } = await axios.post("/users/signup", credentials);
//         console.log(data);
//         setAuthHeader(data.token);
//         return data;
//       } catch (e) {
//         return thunkAPI.rejectWithValue(e.message);
//       }
//     }
//   );
  
//   export const login = createAsyncThunk(
//     "auth/login",
//     async (credentials, thunkAPI) => {
//       try {
//         const { data } = await axios.post("/users/login", credentials);
//         setAuthHeader(data.token);
//         return data;
//       } catch (e) {
//         return thunkAPI.rejectWithValue(e.message);
//       }
//     }
//   );
  
//   export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//     try {
//       await axios.post("/users/logout");
//       clearAuthHeader();
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   });
  
//   export const refreshUser = createAsyncThunk(
//     "auth/refresh",
//     async (_, thunkAPI) => {
//       const state = thunkAPI.getState();
//       try {
//         setAuthHeader(state.auth.token);
//         const { data } = await axios.get("/users/current");
//         return  data;
//       } catch (e) {
//         return thunkAPI.rejectWithValue(error.e);
//       }
//     },
//     {
//       condition: (_, thunkAPI) => {
//         const state = thunkAPI.getState();
//         return state.auth.token !== null;
//       },
//     }
//   );