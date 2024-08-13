// Define the initial state type
interface ProductState {
  status: boolean;
  priceRange: number;
}

// Define the initial state with type
const initialState: ProductState = {
  status: false,
  priceRange: 1000,
};

// Define action types
type ProductAction =
  | { type: "product/toggleState" }
  | { type: "product/setPriceRange"; payload: number };

// Define the reducer function with types
const productSlice = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "product/toggleState":
      return {
        ...state,
        status: !state.status,
      };
    case "product/setPriceRange":
      return {
        ...state,
        priceRange: action.payload,
      };
    default:
      return state;
  }
};

// Define action creators with types
const toggleState = (): ProductAction => ({ type: "product/toggleState" });
const setPriceRange = (payload: number): ProductAction => ({
  type: "product/setPriceRange",
  payload,
});

export { toggleState, setPriceRange };
export default productSlice;
