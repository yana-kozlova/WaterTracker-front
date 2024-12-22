import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://watertracker-back-i1qk.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchUserInfo = createAsyncThunk(
  "settingModal/fetchUserInfo",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    setAuthHeader(token);

    try {
      const { data } = await axios.get("/users/current");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "settingModal/updateUserInfo",
  async (userInfo, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    setAuthHeader(token);

    try {
      const { data } = await axios.patch("/users/current", userInfo);
      return data;
    } catch (error) {
      console.error("Error from API:", error.response?.data || error.message);
      console.error("Full Error Object:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "settingModal/updateUserAvatar",
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    setAuthHeader(token);

    console.log("Sending avatar to API...");
    try {
      const { data } = await axios.patch("/users/avatar", formData);
      return data;
    } catch (error) {
      console.error("Error from API:", error.response?.data || error.message); // Лог помилки
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  "user/updateUserEmail",
  async (newEmail, thunkAPI) => {
    try {
      const response = await axios.patch("/users/current", { email: newEmail });
      return { email: response.data.email };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error updating email"
      );
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const response = await axios.patch("/users/current", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error updating password"
      );
    }
  }
);
