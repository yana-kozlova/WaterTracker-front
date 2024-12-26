import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addWater, deleteWater, editWater, getTodayWater, getMonthWater } from './operations';

const initialState = {
  waterItem: [],
  monthWater: [],
  isLoading: false,
  error: false,
};
const slice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
    builder
      // GetAll
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.monthWater = action.payload.data;
      })
      // Get Today
      .addCase(getTodayWater.fulfilled, (state, action) => {
        state.waterItem = action.payload.data;
      })
      //Add
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterItem.push(action.payload.data.waterList);
      })
      //Delete
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.waterItem = state.waterItem.filter(
          (waterItem) => waterItem.id !== action.payload.id
        );
      })
      //Edit
      .addCase(editWater.fulfilled, (state, action) => {
        state.waterItem = state.waterItem.map((waterItem) =>
          waterItem._id === action.payload.data.waterList._id ? action.payload.data.waterList : waterItem
        );
      })
      //addMatcher
      .addMatcher(
        isAnyOf(
          getMonthWater.pending,
          addWater.pending,
          deleteWater.pending,
          editWater.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getMonthWater.fulfilled,
          getMonthWater.rejected,
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
        isAnyOf(
          getMonthWater.fulfilled,
          addWater.fulfilled,
          deleteWater.fulfilled,
          editWater.fulfilled
        ),
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getMonthWater.rejected,
          addWater.rejected,
          deleteWater.rejected,
          editWater.rejected
        ),
        (state) => {
          state.error = true;
        }
      );
  },
});

export const waterReducer = slice.reducer;
