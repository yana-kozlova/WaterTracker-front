export const selectUser = (state) => state.auth.user;
export const selectDailyNorma = (state) => state.auth.user.daily_norma;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectIsRegistered = (state) => state.auth.isRegistered;







