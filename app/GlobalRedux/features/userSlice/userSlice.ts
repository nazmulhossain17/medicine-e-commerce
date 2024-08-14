import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
      state.isError = false;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isError = true;
    },
    signOutUserStart: (state) => {
      state.isLoading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.isError = false;
    },
    signOutUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isError = true;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.isError = false;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isError = true;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.currentUser && state.currentUser.id === action.payload.id) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    userAdded: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUser,
  userAdded,
  removeUser,
} = userSlice.actions;

export default userSlice.reducer;
