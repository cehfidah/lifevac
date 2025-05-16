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
//                         sectionTitle: "AirwayClear™-Antichoking Device:",
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
