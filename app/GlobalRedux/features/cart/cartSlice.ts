import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the CartState type
interface CartState {
  products: Product[];
  total: number;
}

// Define the initial state
const initialState: CartState = {
  products: [],
  total: 0,
};

// Utility function to load the cart from localStorage
const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : initialState;
  }
  return initialState;
};

// Utility function to save the cart to localStorage
const saveCartToLocalStorage = (cartState: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }
};

// Utility function to calculate the total price
const calculateTotal = (products: Product[]): number => {
  return products.reduce(
    (sum, product) => sum + product.price * (product.quantity || 1),
    0
  );
};

// Create a slice of the store for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total = calculateTotal(state.products);
      saveCartToLocalStorage(state);
    },
    removeOne: (
      state,
      action: PayloadAction<{ _id: string; price: number }>
    ) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else if (existing) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }

      state.total = calculateTotal(state.products);
      saveCartToLocalStorage(state);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ _id: string; price: number; quantity: number }>
    ) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      state.total = calculateTotal(state.products);
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

// Define the type for the root state to use in the selector
interface RootState {
  cart: CartState;
}

// Selector to access the cart state
export const selectCart = (state: RootState) => state.cart;

// Export the reducer
export default cartSlice.reducer;
