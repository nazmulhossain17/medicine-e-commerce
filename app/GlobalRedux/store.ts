import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./features/api/apiSlice"; // Named import
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [api.reducerPath], // Avoid persisting API cache
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Create the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(api.middleware) as any,
});

// Export persistor and types
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
