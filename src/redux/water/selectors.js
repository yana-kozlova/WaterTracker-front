// Water selectors
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectWaterItem = (state) => state.water.waterItem;

// Stats selectors
export const selectFormattedDate = (state) => state.formattedDate;
export const selectServings = (state) => state.servings;
export const selectTotalAmount = (state) => state.totalAmount;
export const selectProgress = (state) => state.progress;

