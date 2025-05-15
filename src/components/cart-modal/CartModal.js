import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeItemFromCart, updateItemQuantity } from '../../store/slice/cartSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, cartOpen } = useSelector((state) => state.cart);

    const subtotal = cartItems.reduce((sum, item) => {
        if (item.type === 'guide' && item.extraPrice !== undefined) {
            // One guide is free, others cost extraPrice
            const extraQty = item.quantity > 1 ? item.quantity - 1 : 0;
            return sum + extraQty * item.extraPrice;
        } else {
            return sum + item.price * item.quantity;
        }
    }, 0);

    useEffect(() => {
        document.body.style.overflow = cartOpen ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [cartOpen]);

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            dispatch(toggleCart());
            navigate('/checkouts', { state: { subtotal, cartItems } });
        }
    };
    return (
        <>
            {cartOpen && (
                <>
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-9999" onClick={() => dispatch(toggleCart())} />

                    {/* Cart Drawer */}
                    <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-999999 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-bold">Your cart</h2>
                            <button onClick={() => dispatch(toggleCart())}>
                                <FaTimes className="text-xl text-gray-700" />
                            </button>
                        </div>

                        {/* Cart Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col justify-center items-center px-6">
                                    <h2 className="text-xl font-extrabold mb-4 text-center">Your cart is empty</h2>
                                    <button
                                        onClick={() => { navigate("/"); dispatch(toggleCart()) }}
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
                                                                Rs. {item.originalPrice.toLocaleString()}
                                                            </span>
                                                        )}
                                                        <span className="text-lg font-semibold">Rs. {item.price.toLocaleString()}</span>
                                                    </div>

                                                    {item.offerText && (
                                                        <p className="text-sm mt-1 text-gray-700">Offer: {item.offerText}</p>
                                                    )}

                                                    {item.title && (
                                                        <div className="mt-1 text-sm flex items-center gap-1 text-blue-600">
                                                            <span>🏷</span> <span>{item.title}</span>
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
                                                                onClick={() =>
                                                                    dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                                                }
                                                            >+</button>
                                                        </div>
                                                        <button
                                                            className="text-red-500 ml-2"
                                                            onClick={() => dispatch(removeItemFromCart(item.id))}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Checkout Footer */}
                        {cartItems.length > 0 && (
                            <>
                                <div className="p-4 border-t">
                                    <div className="flex justify-between font-semibold text-lg mb-4">
                                        <span>Subtotal</span>
                                        <span>Rs. {subtotal.toFixed(2)}</span>
                                    </div>
                                    <button
                                        className={`w-full py-2 rounded mt-4 transition font-semibold ${cartItems.length === 0
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-blue-800 text-white hover:bg-blue-900'
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
