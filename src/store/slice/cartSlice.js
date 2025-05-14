// store/slice/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartOpen: false,
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        },
        addItemToCart: (state, action) => {
            const { id, guideIncluded } = action.payload;

            const existing = state.cartItems.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            // Add guide if included
            if (guideIncluded) {
                const guideExists = state.cartItems.find(item => item.type === 'guide');
                if (!guideExists) {
                    state.cartItems.push({
                        id: 'guide',
                        name: 'Guide For Household Emergencies',
                        type: 'guide',
                        price: 0,
                        originalPrice: 1200,
                        quantity: 1,
                        image: "https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600",
                    });
                }
            }
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id === id);
            if (item) item.quantity = quantity;
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { toggleCart, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
