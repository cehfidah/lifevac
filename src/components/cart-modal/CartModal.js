import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeItemFromCart, updateItemQuantity, addItemToCart } from '../../store/slice/cartSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDiscount } from "react-icons/md";

const CartModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, cartOpen } = useSelector((state) => state.cart);
    const [errorMessages, setErrorMessages] = useState({});

    const hasGuideIncluded = cartItems.some(
        item => item.guideIncluded || item.id === 'guideStandalone'
    );
    const handleAddCart = () => {
        dispatch(addItemToCart({
            id: 'guideStandalone',
            sectionTitle: 'Guide For Household Emergencies',
            price: 1200,
            originalPrice: 4400,
            quantity: 1,
            image: 'https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600',
            guideIncluded: false,
            freeQty: 0,
            extraPrice: 0
        })); // Only dispatch here
    };

    const subtotal = cartItems.reduce((sum, item) => {
        if (item.type === 'guide') {
            return sum + Number(item.extraPrice || 0);
        }
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);


    useEffect(() => {
        document.body.style.overflow = cartOpen ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [cartOpen]);

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            console.log(subtotal, cartItems, "subtotal, cartItems")
            // dispatch(toggleCart());
            // navigate('/checkouts', { state: { subtotal, cartItems } });
        }
    };
    return (
        <>
            {cartOpen && (
                <>
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-9999" onClick={() => dispatch(toggleCart())} />

                    {/* Cart Drawer */}
                    <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-999999 flex flex-col overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-bold">Your cart</h2>
                            <button onClick={() => dispatch(toggleCart())}>
                                <FaTimes className="text-xl text-gray-700" />
                            </button>
                        </div>

                        {/* Cart Content */}
                        <div className="flex-1 px-1 py-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col justify-center items-center px-6">
                                    <h2 className="text-xl font-extrabold mb-4 text-center">Your cart is empty</h2>
                                    <button
                                        onClick={() => { navigate("/product/airwayclear"); dispatch(toggleCart()) }}
                                        className="bg-[#0d1b39] text-white px-6 py-2 rounded font-semibold text-sm"
                                    >
                                        Continue shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl px-6 max-w-md w-full">
                                    {cartItems.map((item) => (
                                        <>
                                            <div key={item.id} className="flex gap-4 border-b py-4">
                                                <img src={item.image} alt={item.sectionTitle} className="w-20 h-20 object-contain" />

                                                <div className="flex-1">
                                                    <h3 className="font-semibold">{item.sectionTitle}</h3>

                                                    <div className="mt-1">
                                                        {item.originalPrice && (
                                                            <span className="line-through text-gray-400 text-sm mr-2">
                                                                {item.originalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                            </span>
                                                        )}
                                                        <span className="text-lg font-semibold">
                                                            {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                        </span>
                                                    </div>

                                                    {item.title && (
                                                        <p className="text-sm mt-1 font-medium text-[#121212f3]">Offer: Buy One</p>
                                                    )}

                                                    {item.title && (
                                                        <div className="mt-1 text-xs font-medium flex items-center gap-1 text-[#121212f3]">
                                                            <MdOutlineDiscount /> <span>{item.title}</span>
                                                        </div>
                                                    )}

                                                    {/* Quantity and Delete */}
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <div className="flex items-center border rounded px-2">
                                                            <button
                                                                className="text-lg px-2"
                                                                onClick={() =>
                                                                    dispatch(updateItemQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                                                                }

                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-2">{item.quantity}</span>
                                                            <button
                                                                className="text-lg px-2"
                                                                onClick={() => {
                                                                    // Prevent manual increment for free guide
                                                                    if (item.type === 'guide' && item.freeQty >= item.quantity) {
                                                                        handleAddCart();
                                                                        setErrorMessages(prev => ({
                                                                            ...prev,
                                                                            [item.id]: 'You can only add 1 of this item to your cart.'
                                                                        }));
                                                                        setTimeout(() => {
                                                                            setErrorMessages(prev => {
                                                                                const newErrors = { ...prev };
                                                                                delete newErrors[item.id];
                                                                                return newErrors;
                                                                            });
                                                                        }, 5000);
                                                                        return;
                                                                    }
                                                                    dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }));
                                                                }}
                                                            >+</button>
                                                        </div>
                                                        <button
                                                            className="text-red-500 ml-2"
                                                            onClick={() => dispatch(removeItemFromCart(item.id))}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>

                                                    {errorMessages[item.id] && (
                                                        <div className="px-4 pb-2 text-red-600 font-medium text-sm">
                                                            ⚠️ {errorMessages[item.id]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    {/* Suggest Guide if no guideIncluded exists */}
                                    {!hasGuideIncluded && (
                                        <>
                                            <h3 className="font-bold text-lg mt-4 mb-2 px-4 text-[#121212e6]">Frequently Bought Together</h3>
                                            <div className="border rounded-xl p-4 text-[#121212e6] bg-[#f3f3f3]" style={{
                                                boxShadow: '.3rem .3rem 1rem rgba(0,0,0,.15)'
                                            }}>
                                                <div className="flex gap-4 items-start">
                                                    <img src="https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600" alt="Guide" className="w-16 h-16 object-contain" />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-base">Guide For Household Emergencies</h4>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Learn how to handle bleeding, cardiac events, and newborn emergencies—written by a real paramedic. Over 60 pages of lifesaving tips every home should have.
                                                        </p>
                                                        <div className="mt-2">
                                                            <span className="text-[#162950] font-bold text-base mr-2">
                                                                {1200.00.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                            </span>
                                                            <span className="line-through font-bold text-xs">
                                                                {4400.00.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                            </span>
                                                        </div>
                                                        <button
                                                            className="mt-1 bg-[#162950] text-white px-4 py-1 rounded font-medium text-sm"
                                                            onClick={handleAddCart}
                                                        >
                                                            + Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>
                            )}
                        </div>

                        {/* Checkout Footer */}
                        {cartItems.length > 0 && (
                            <>
                                <div className="p-4 border-t">
                                    <div className="flex justify-between font-semibold text-lg mb-4">
                                        <span>Subtotal</span>
                                        <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <button
                                        className={`w-full py-2 rounded-xl mt-4 transition font-bold text-lg ${cartItems.length === 0
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-[#162950] text-white'
                                            }`}
                                        onClick={handleCheckout}
                                        disabled={cartItems.length === 0}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default CartModal;
