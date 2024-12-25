// Water selectors
export const selectLoading = (state) => state.water.isLoading;
export const selectError = (state) => state.water.error;
export const selectIsTodayWaterLoaded = (state) => state.water.isTodayWaterLoaded;
export const selectIsMonthWaterLoaded = (state) => state.water.isMonthWaterLoaded;
export const selectTodayItem = (state) => state.water.waterItem;
export const selectMonthItem = (state) => state.water.monthWater;