import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeItemFromCart, updateItemQuantity } from '../../store/slice/cartSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, cartOpen } = useSelector((state) => state.cart);

    const guideItem = cartItems.find(item => item.type === 'guide');
    const mainItems = cartItems.filter(item => item.type !== 'guide');

    const subtotal = mainItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        document.body.style.overflow = cartOpen ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [cartOpen]);

    const handleCheckout = () => {
        console.log('Cart Items:', cartItems);
        console.log('Subtotal:', subtotal);
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
                                <div className="bg-white rounded-xl p-6 max-w-md w-full">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between mb-4">
                                            <img src={item.image || "https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600"} alt={item.name} className="w-14 h-14 object-contain" />
                                            <div>
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-sm line-through">Rs. {item.originalPrice}</p>
                                                <p className="text-sm text-green-600">Rs. {item.price}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="border px-2"
                                                    onClick={() =>
                                                        dispatch(updateItemQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                                                    }

                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="border px-2"
                                                    onClick={() =>
                                                        dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                                    }
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="text-red-500 ml-2"
                                                    onClick={() => dispatch(removeItemFromCart(item.id))}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
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
                                    <button className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition mt-4"
                                        onClick={handleCheckout}
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
