import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWater = createAsyncThunk(
  "todayWater/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/waterlist");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  "todayWater/addWater",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post("today-water/add", value);
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
      const { data } = await axios.delete(`today-water/${WaterId}`);
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
      const { data } = await axios.patch(`today-water/edit/${WaterId}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
