import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { register, login, logout,refreshUser } from "./operations";


const initialState = {
  item: {
    date:null,
    amount:null,
    curDaylyNorm:null
  },
  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: "todayWater",
  initialState,
  extraReducers: (builder) => {

  },
});

export const todayWaterReducer = slice.reducer;