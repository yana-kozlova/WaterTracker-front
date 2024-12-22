// Селектори для модального вікна та користувача

// Селектор для перевірки, чи відкрита модалка налаштувань
export const selectIsSettingModalOpen = (state) => state.modal.isSettingModalOpen;

// Селектори для даних користувача
export const selectUserInfo = (state) => state.user.user;
export const selectUserAvatar = (state) => state.user.user.avatar || "/path/to/default-avatar.png";
export const selectIsUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUser = (state) => state.settingModal.user;
