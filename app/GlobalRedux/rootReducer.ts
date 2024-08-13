import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/userSlice";
import { api } from "./features/api/apiSlice";
import productReducer from "./features/products/productSlice";
import cartReducer from "./features/cart/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
