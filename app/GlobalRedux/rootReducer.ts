import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
