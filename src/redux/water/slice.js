import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {  addWater, deleteWater, editWater,getWater } from "./operations";

const initialState = {
  waterItem: [],

  isLoading: false,
  error: false,
};
const slice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
    builder
      GetAll
      .addCase(getWater.fulfilled, (state, action) => {
        state.waterItem = action.payload.data.waterList;
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
          waterItem.id === action.payload.id ? action.payload : waterItem
        );

      })
      //addMatcher
      .addMatcher(
        isAnyOf(
          getWater.pending,
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
        isAnyOf(
          getWater.fulfilled,
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
          getWater.rejected,
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

export const todayWaterReducer = slice.reducer;
