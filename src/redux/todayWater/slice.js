import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getWater,addWater, deleteWater, editWater } from "./operations";

const initialState = {
  waterAmount: [],
  isLoading: false,
  error: false,
};
const slice = createSlice({
  name: "todayWater",
  initialState,
  extraReducers: (builder) => {
    builder
      //GetAll
      .addCase(getWater.fulfilled, (state, action) => {
        state.waterAmount = action.payload;
      })
      //Add
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterAmount.push(action.payload);
      })
      //Delete
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.waterAmount = state.waterAmount.filter(
          (waterItem) => waterItem.id !== action.payload.id
        );
      })
      //Edit
      .addCase(editWater.fulfilled, (state, action) => {
        state.waterAmount = state.waterAmount.map((waterItem) =>
          waterItem.id === action.payload.id ? action.payload : waterItem
        );
      })
      //addMatcher
      .addMatcher(
        isAnyOf(getWater.pending,addWater.pending, deleteWater.pending, editWater.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getWater.fulfilled,
          getWater.rejected,
          addWater.fulfilled,
          addWater.rejected,
          deleteWater.fulfilled,
          deleteWater.rejected,
          editWater.fulfilled,
          editWater.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(getWater.fulfilled,addWater.fulfilled, deleteWater.fulfilled, editWater.fulfilled),
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getWater.rejected,
          addWater.rejected,
          deleteWater.rejected,
          editWater.rejected
        ),
        (state) => {
          state.error = action.payload;
        }
      );
  },
});

export const todayWaterReducer = slice.reducer;
