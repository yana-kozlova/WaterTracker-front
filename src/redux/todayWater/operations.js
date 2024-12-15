import { createAsyncThunk } from "@reduxjs/toolkit";

export const addWater = createAsyncThunk(
  "todayWater/addWater",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post("add", value);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "todayWater/deleteWater",
  async (WaterId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`delete/${WaterId}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editWater = createAsyncThunk(
  "todayWater/editWater",
  async (WaterId, thunkAPI) => {
    try {
      const { data } = await axios.put(`edit/${WaterId}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
