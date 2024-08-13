// types.ts
export type UserState = {
  currentUser: any;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

export type ProductState = {
  // Define your product state here
};

export type CartState = {
  // Define your cart state here
};

export type AppState = {
  user: UserState;
  product: ProductState;
  cart: CartState;
  api: any;
};
