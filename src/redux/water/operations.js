import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMonthWater = createAsyncThunk(
  "water/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/home");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getTodayWater = createAsyncThunk(
  "water/getToday",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/water");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  "water/addWater",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post("water/add", value);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (WaterId, thunkAPI) => {
    try {
      await axios.delete(`water/${WaterId}`);
      return { id: WaterId };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editWater = createAsyncThunk(
  "water/editWater",
  async ({_id,amount,water}, thunkAPI) => {
    try {
      const { data } = await axios.patch(`water/edit/${_id}`,amount,water);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
