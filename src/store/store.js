import { configureStore } from "@reduxjs/toolkit";

// redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Slice here
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export { store, persistor };
