import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import themeReducer from "./theme/themeSlice.js"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//combine Reducer user CombineReducerFunction
const rootReducer = combineReducers({
  user:userReducer,
  theme:themeReducer,
})
// Persist configuration
const persistConfig = {
  key: "root", // Key to identify persisted state in storage
  storage, // Use localStorage for persisting
  version: 1,
  whitelist: ['user', 'theme'], // Only persist theme slice
};
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedUserReducer = persistReducer(persistConfig, userReducer);
// const persistedThemeReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer:persistedReducer,
  // reducer:{user:persistedUserReducer,theme:persistedThemeReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
