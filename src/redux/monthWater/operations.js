import { createAsyncThunk } from "@reduxjs/toolkit";


export const getWater = createAsyncThunk(
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