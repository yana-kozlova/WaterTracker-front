import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAll = createAsyncThunk(
    "monthStats/getAll",
    async (_, thunkAPI) => {
      try {
        const { data } = await axios.get("monthstats");
        return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );