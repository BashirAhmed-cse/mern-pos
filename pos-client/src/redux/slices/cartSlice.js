import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state, action) => {
            const exists = state.some(item => item.id === action.payload.id);
            if (!exists) {
                state.push(action.payload);
            }
        },

        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        }
    }
});

export const { addItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
