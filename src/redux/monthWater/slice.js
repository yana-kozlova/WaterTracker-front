import { createSlice, isAnyOf } from "@reduxjs/toolkit";

monthWaterList[-date - daylyNorm - servings - planDaylyNorm];

const initialState = {
  waterAmount: [],
  isLoading: false,
  error: false,
};
const slice = createSlice({
  name: "monthStats",
  initialState,
  extraReducers: (builder) => {
    builder
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
        isAnyOf(addWater.pending, deleteWater.pending, editWater.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
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
        isAnyOf(addWater.fulfilled, deleteWater.fulfilled, editWater.fulfilled),
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(addWater.rejected, deleteWater.rejected, editWater.rejected),
        (state) => {
          state.error = action.payload;
        }
      );
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
