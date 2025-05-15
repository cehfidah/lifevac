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

            // Handle guide addition
            if (guideIncluded) {
                const guideItem = state.cartItems.find(item => item.type === 'guide');
                if (guideItem) {
                    guideItem.quantity += 1;
                } else {
                    state.cartItems.push({
                        id: 'guide',
                        sectionTitle: 'Guide For Household Emergencies',
                        type: 'guide',
                        price: 0,
                        originalPrice: 1200,
                        savings: "",
                        quantity: 1,
                        extraPrice: 1200, // Extra price for paid guides if more than 1
                        image: "https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600",
                        title: "BUY ONE",
                        kits: "1× Full Kit",
                    });
                }
            }
        },

        removeItemFromCart: (state, action) => {
            const removedItem = state.cartItems.find(item => item.id === action.payload);
            const wasGuideIncluded = removedItem?.guideIncluded;

            // Remove item from cart
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);

            // Handle guide adjustment
            const guideItem = state.cartItems.find(i => i.type === 'guide');
            if (wasGuideIncluded && guideItem) {
                guideItem.quantity -= 1;

                const remainingGuideIncludedOffers = state.cartItems.filter(
                    i => i.type !== 'guide' && i.guideIncluded
                );

                if (remainingGuideIncludedOffers.length === 0) {
                    // No free guides should be available now
                    guideItem.price = 1200;
                    delete guideItem.extraPrice;
                } else {
                    // Keep first guide free, rest extra priced
                    guideItem.price = 0;
                    guideItem.extraPrice = 1200;
                }

                // If guide quantity becomes 0, remove it completely
                if (guideItem.quantity <= 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== 'guide');
                }
            }
        },

        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id === id);

            if (item) {
                item.quantity = quantity;

                if (item.type === 'guide') {
                    const guideIncludedOffers = state.cartItems.filter(
                        i => i.type !== 'guide' && i.guideIncluded
                    );

                    if (guideIncludedOffers.length > 0) {
                        item.price = 0;
                        item.extraPrice = 1200;
                    } else {
                        item.price = 1200;
                        delete item.extraPrice;
                    }

                    if (item.quantity <= 0) {
                        state.cartItems = state.cartItems.filter(i => i.id !== 'guide');
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



// const subtotal = cartItems.reduce((total, item) => {
//     if (item.type === 'guide' && item.extraPrice) {
//         return total + (item.quantity - 1) * item.extraPrice;
//     }
//     return total + item.quantity * item.price;
// }, 0);

// some channge code in cart in logic update