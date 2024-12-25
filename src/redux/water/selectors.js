// Water selectors
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectIsTodayWaterLoaded = (state) => state.water.loading;
export const selectIsMonthWaterLoaded = (state) => state.water.loading;
export const selectTodayItem = (state) => state.water.waterItem;
export const selectMonthItem = (state) => state.water.monthWater;



