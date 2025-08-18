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
            const { id, guideIncluded, title, kits } = action.payload;

            // Add or update the main item
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            // Handle guide if applicable
            if (guideIncluded) {
                const guideId = `guide${id}`;
                const existingGuide = state.cartItems.find(item => item.id === guideId);

                if (existingGuide) {
                    existingGuide.quantity += 1;
                    existingGuide.freeQty += 1;
                } else {
                    state.cartItems.push({
                        id: guideId,
                        customId: id,
                        sectionTitle: 'Guide For Household Emergencies',
                        type: 'guide',
                        price: 0,
                        originalPrice: 1200,
                        oneItemPrice: 0,
                        oneItemOriginalPrice: 1200,
                        savings: "",
                        quantity: 1,
                        freeQty: 1,                  // NEW FIELD
                        extraPrice: 0,               // NEW FIELD, updated in subtotal logic
                        image: "/lifevacdevice.svg",
                        title: title,
                        kits: kits,
                    });
                }
            }
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id === id);
            if (!item) return;

            item.quantity = quantity;

            if (item.type === 'guide') {
                const extraQty = quantity - item.freeQty;
                item.extraPrice = extraQty > 0 ? extraQty * item.originalPrice : 0;
            }
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            const itemToRemove = state.cartItems.find(item => item.id === itemId);
            if (!itemToRemove) return;

            // Remove main item
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);

            // If removing a main item with a guideIncluded
            if (itemToRemove.guideIncluded) {
                const guideId = `guide${itemId}`;
                const guideItem = state.cartItems.find(item => item.id === guideId);

                if (guideItem) {
                    guideItem.quantity -= 1;
                    guideItem.freeQty -= 1;
                    guideItem.title = "";
                    guideItem.kits = "";

                    // Recalculate extraPrice
                    const extraQty = guideItem.quantity - guideItem.freeQty;
                    guideItem.extraPrice = extraQty > 0 ? extraQty * guideItem.originalPrice : 0;

                    if (guideItem.quantity <= 0) {
                        state.cartItems = state.cartItems.filter(item => item.id !== guideId);
                    }
                }
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { toggleCart, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
