import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
// Now using TypeScript files
import userReducer from "@/store/slices/userSlice";
import gameReducer from "@/store/slices/gameSlice";
import multipliersReducer from "@/store/slices/multipliersSlice";
import uiReducer from "@/store/slices/uiSlice";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  multipliers: multipliersReducer,
  ui: uiReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "game", "multipliers"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Export types
export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;

