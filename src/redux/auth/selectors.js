export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsRegistered = state => state.auth.isRegistered;


// // Селектори для даних користувача
// export const selectUserInfo = (state) => state.user.user;
// export const selectUserAvatar = (state) => state.user.user.avatar || "/path/to/default-avatar.png";
// export const selectIsUserLoading = (state) => state.user.loading;
// export const selectUserError = (state) => state.user.error;
// export const selectUser = (state) => state.settingModal.user;


// export const selectLoading = (state) => state.users.loading;
// export const selectError = (state) => state.users.error;
// // export const selectUser = (state) => state.users.user;
// export const selectUser = (state) => state.auth.user;
