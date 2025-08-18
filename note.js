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

            // Count total quantity of all guideIncluded items
            const guideIncludedCount = state.cartItems
                .filter(i => i.guideIncluded)
                .reduce((total, i) => total + i.quantity, 0);

            let guideItem = state.cartItems.find(item => item.type === 'guide');

            if (guideIncludedCount > 0) {
                if (!guideItem) {
                    state.cartItems.push({
                        id: 'guide',
                        sectionTitle: 'Guide For Household Emergencies',
                        type: 'guide',
                        price: 0,
                        originalPrice: 1200,
                        savings: "",
                        quantity: guideIncludedCount,
                        image: "lifevacdevice.svg",
                        title: "BUY ONE",
                        kits: "1× Full Kit",
                        extraPrice: 1200
                    });
                } else {
                    guideItem.quantity = Math.max(guideItem.quantity, guideIncludedCount);
                    guideItem.price = 0;
                    guideItem.extraPrice = 1200;
                }
            }
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            const itemToRemove = state.cartItems.find(item => item.id === itemId);

            if (!itemToRemove) return;

            // Remove the item from cart
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);

            // Check if item had guideIncluded
            if (itemToRemove.guideIncluded) {
                const guideItem = state.cartItems.find(i => i.type === 'guide');
                if (guideItem) {
                    // Decrease guide quantity
                    guideItem.quantity -= itemToRemove.quantity;

                    // If guide quantity drops to 0, remove it
                    if (guideItem.quantity <= 0) {
                        state.cartItems = state.cartItems.filter(i => i.id !== 'guide');
                    } else {
                        // Guide still present, but check if other items still have guideIncluded
                        const stillHasGuideIncluded = state.cartItems.some(i => i.guideIncluded);
                        if (stillHasGuideIncluded) {
                            guideItem.price = 0;
                            guideItem.extraPrice = 1200;
                        } else {
                            guideItem.price = 1200;
                            delete guideItem.extraPrice;
                        }
                    }
                }
            }
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id === id);

            if (item) {
                item.quantity = quantity;

                if (item.type === 'guide') {
                    const mainItems = state.cartItems.filter(i => i.type !== 'guide');
                    const hasOfferWithGuide = mainItems.some(i => i.guideIncluded);

                    if (hasOfferWithGuide) {
                        // First guide is free, rest are Rs. 1200
                        item.price = 0;
                        item.extraPrice = 1200; // used later in subtotal calculation
                    } else {
                        // No offers with guide left, all guides full price
                        item.price = 1200;
                        delete item.extraPrice;
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




// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { ApiHandler } from "../helper/ApiHandler";
// import { useDispatch, useSelector } from "react-redux";

// export default function Paypal() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { token } = useSelector((state) => state.auth)

//     const generateInvoiceId = () => `INV-${Date.now()}`;
//     const generateCustomId = () => `USER-${Math.random().toString(36).substr(2, 9)}`;

//      const [invoice_id, setInvoice_id] = useState("");
//         const [custom_id, setCustom_id] = useState("");

//     const handleApprove = async (data, actions) => {
//         try {
//             const details = await actions.order.capture();
//             const transactionId = details.id;

//             const payload = {
//                transactionId: transactionId,
//                 invoice_id: invoice_id,
//                 custom_id: custom_id,
//                 txn_id: details.id,
//                 item_quantity: 3,
//                 sub_total: 3474.64,
//                 shipping_amount: 500,
//                 final_amount: 3974.64,
//                 total_saving: 2625.36,
//                 product_detail: [
//                     {
//                         id: "offer1",
//                         image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_3_300x300.svg?v=1737985220",
//                         sectionTitle: "LifeVac™-Antichoking Device:",
//                         title: "BUY ONE",
//                         kits: "1× Full Kit",
//                         price: 3474.64,
//                         originalPrice: 6100,
//                         savings: 2625.36,
//                         guideIncluded: false,
//                         tag: false,
//                         tagText: "",
//                         quantity: 3
//                     }
//                 ],
//                 shipping_address: {
//                     firstName: "Doshi Kirtan",
//                     lastName: "Rajnikant",
//                     address: "47 Milap Nagar Main Road Shakti Nagar",
//                     apt: "hjghbjb",
//                     city: "Rajkot",
//                     zip: "360005",
//                     phone: "9512218936",
//                     country: "India",
//                     state: "Gujarat",
//                     phoneCode: "91"
//                 }
//             };
//             try {
//                 const response = await ApiHandler("/", "POST", payload, token, dispatch, navigate);
//                 if (response.data.status === "1") {
//                     toast.success(response.data.msg);

//                     const paymentResponse = {
//                         payer: details.payer.name.given_name,
//                         email: details.payer.email_address,
//                         amount: details.purchase_units[0].amount.value,
//                         currency: details.purchase_units[0].amount.currency_code,
//                         status: details.status,
//                         id: details.id,
//                         backendMessage: backendResponse.data.message,
//                     };

//                     navigate('/success', { state: paymentResponse });
//                 } else {
//                     toast.error(response.data.msg);
//                 }
//             } catch (error) {
//                 toast.error("An error occurred. Please try again.");
//             }
//         } catch (err) {
//             console.error("Payment failed", err);
//             navigate('/fail', {
//                 state: {
//                     message: "Payment failed. Please try again later."
//                 }
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <PayPalScriptProvider
//             options={{
//                 "client-id": process.env.REACT_APP_PAYPAL_CLIENT_KEY
//             }}>
//             <div className="flex flex-col items-center justify-center h-screen">
//                 <h1 className="text-2xl mb-4">Pay with PayPal</h1>
//                 <PayPalButtons
//                     style={{ layout: "vertical" }}
//                     createOrder={(data, actions) => {
//                          const invoiceId = generateInvoiceId();
//                         const customId = generateCustomId();

//                         setInvoice_id(invoiceId);
//                         setCustom_id(customId);
//                         return actions.order.create({
//                             purchase_units: [{
//                                 amount: {
//                                     value: "899.00",
//                                 },
//                                 description: "Payment for order",
//                                 invoice_id: invoiceId,
//                                 custom_id: customId,
//                             }]
//                         });
//                     }}
//                     onApprove={handleApprove}
//                 />
//             </div>
//         </PayPalScriptProvider>
//     );
// }
