export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
// export const selectUser = (state) => state.users.user;
export const selectUser = (state) => state.auth.user;