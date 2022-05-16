const { createSlice } = require("@reduxjs/toolkit");

const STATUS = Object.freeze({
  ERROR: "Error",
  LOADING: "Loading",
  IDEAL: "Ideal",
});

const initialState = {
  data: [],
  status: STATUS.IDEAL,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunk - thunk is a functoin that returns a function

export function fetchProduct() {
  return async function fetchProductThunk(dispatch, getState) {
    // getState - current state ne get karva mate
    // const property = getState().product;

    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(setProduct(data));
      dispatch(setStatus(STATUS.IDEAL));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
