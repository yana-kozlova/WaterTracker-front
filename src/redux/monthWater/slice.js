import { createSlice } from "@reduxjs/toolkit";
import { getAll } from "./operations";

const initialState = {
  monthWater: [],
  isLoading: false,
  error: false,
};
const slice = createSlice({
  name: "monthStats",
  initialState,
  extraReducers: (builder) => {
    builder
      //GetAll
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.monthWater = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAll.rejected, (state) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const monthWaterReducer = slice.reducer;

// monthWaterList
//  [
//    -date
//    -daylyNorm
//    -servings
//    -planDaylyNorm
//  ]
