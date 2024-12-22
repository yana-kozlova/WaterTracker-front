import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { todayWaterReducer } from "./water/slice";
import { monthWaterReducer } from "./monthWater/slice";
import { modalReducer } from "./modal/slice"; // Редюсер модалки
import { settingModalReducer } from "./settingModal/slice"; // Редюсер користувача
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    todayWater: todayWaterReducer,
    monthWater: monthWaterReducer,
    settingModal: settingModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
