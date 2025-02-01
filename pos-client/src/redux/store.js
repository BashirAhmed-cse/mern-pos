import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerReducer from "./slices/customerSlice"; // Path to your customer slice

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, customerReducer);

const store = configureStore({
  reducer: {
    customer: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
