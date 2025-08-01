import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const exists = state.some(item => item.name === action.payload.name); // Check by name instead of id
      if (!exists) {
        state.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

// Corrected total price selector
export const gettotalPrice = (state) =>
  state.cart.reduce((total, item) => total + item.price, 0);

export const { addItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
