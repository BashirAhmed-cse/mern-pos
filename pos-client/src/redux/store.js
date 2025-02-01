import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerReducer from "./slices/customerSlice"; 
import cartSlice from "./slices/cartSlice"; 

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, customerReducer);

const store = configureStore({
  reducer: {
    customer: persistedReducer,
    cart : cartSlice
  },
});

const persistor = persistStore(store);

export { store, persistor };
