import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLogedIn: false,
    data: [
      // {name,email,gender,avatarUrl,daylyNorm}
    ],
  },
  todayWaterList: [
    // {date,amount,curDaylyNorm**}
  ],
  monthWaterList: [
    // date, daylyNorm, servings, planDaylyNorm
  ],
};

const rootReducer = (state = initialState, action) => {
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
});



// todayWaterList
//  [
//    -date
//    -amount
//    -curDaylyNorm**
//  ]

// monthWaterList
//  [
//    -date
//    -daylyNorm
//    -servings
//    -planDaylyNorm
//  ]
