import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://watertracker-back-i1qk.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// _________________________________________________________________
// credentials - данные с формы регистрации

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      if (e.response && e.response.data) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      if (e.response && e.response.data) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      setAuthHeader(state.auth.token);
      const { data } = await axios.get("/users/current");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      return state.auth.token !== null;
    },
  }
);
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (code, { rejectWithValue }) => {
    try {
      // 1. Получаем токен
      console.log("Sending OAuth code to server...");
      const response = await axios.post("/auth/confirm-oauth", { code });
      console.log("Server response:", response.data);

      const { accessToken } = response.data.data;
      console.log("Received access token:", accessToken);

      // 2. Устанавливаем токен
      setAuthHeader(accessToken);
      console.log("Authorization header set");

      // 3. Небольшая задержка перед запросом данных пользователя
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Получаем данные пользователя с полным URL
      console.log("Fetching user data...");
      const { data: userResponse } = await axios.get("/users/current", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("User data received:", userResponse);

      // Проверяем структуру данных
      const userData = userResponse.data || userResponse;
      console.log("Processed user data:", userData);

      // 5. Формируем ответ
      const result = {
        token: accessToken,
        user: {
          name: userData?.name || null,
          email: userData?.email || null,
          gender: userData?.gender || "woman",
          avatarUrl: userData?.avatarUrl || null,
          daylyNorm: userData?.daylyNorm || 2000,
        },
      };
      console.log("Final structured data:", result);

      return result;
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      console.log(
        "Current Authorization header:",
        axios.defaults.headers.common.Authorization
      );
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to get user data"
      );
    }
  }
);
