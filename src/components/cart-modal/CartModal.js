import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "lucide-react";

import {
  toggleCart,
  removeItemFromCart,
  updateItemQuantity,
  addItemToCart,
} from "../../store/slice/cartSlice";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDiscount } from "react-icons/md";
import payone from "../../assest/image/payment1.svg";
import paytwo from "../../assest/image/payment2.svg";
import paythird from "../../assest/image/payment3.svg";
import payfour from "../../assest/image/payment4.svg";
import payfifth from "../../assest/image/payment5.svg";
import paysix from "../../assest/image/payment6.svg";
import paysaven from "../../assest/image/payment7.svg";
import payeaight from "../../assest/image/payment8.svg";

const CartModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, cartOpen } = useSelector((state) => state.cart);
  const [errorMessages, setErrorMessages] = useState({});

  const hasGuideIncluded = cartItems.some(
    (item) => item.guideIncluded || item.id === "guideStandalone"
  );
  const handleAddCart = () => {
    dispatch(
      addItemToCart({
        id: "guideStandalone",
        sectionTitle: "Guide For Household Emergencies",
        price: 1200,
        originalPrice: 1200,
        oneItemPrice: 1200,
        oneItemOriginalPrice: 4400,
        quantity: 1,
        image:
          "https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600",
        guideIncluded: false,
        freeQty: 0,
        extraPrice: 0,
      })
    ); // Only dispatch here
  };

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.type === "guide") {
      return sum + Number(item.extraPrice || 0);
    }
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [cartOpen]);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      dispatch(toggleCart());
      navigate("/checkouts", { state: { subtotal, cartItems } });
    }
  };
  return (
    <>
      {cartOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-9999"
            onClick={() => dispatch(toggleCart())}
          />

          {/* Cart Drawer */}
          <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-999999 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center p-4 ">
              <h2 className="text-4xl font-bold">Your cart</h2>

              <button onClick={() => dispatch(toggleCart())}>
                <FaTimes className="text-xl text-gray-700" />
              </button>
            </div>
            <div className="w-full max-w-xl mx-auto pb-6 px-4 border-b">
              {/* Message */}
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Congrats! You get{" "}
                <span className="text-black font-bold">
                  FREE lifetime replacement!!
                </span>{" "}
                🎉
              </p>

              {/* Progress bar container with positioned tag */}
              <div className="relative">
                {/* Tag above the right end */}
                <div className="absolute -top-2 -right-3 bg-white border rounded-full p-1 shadow-md border-black">
                  <Tag className="w-4 h-4 text-gray-500" />
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-gray-200 rounded-md overflow-hidden">
                  <div className="animated-stripes h-full w-full " />
                </div>
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex-1 px-1 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center px-6">
                  <h2 className="text-xl font-extrabold mb-4 text-center">
                    Your cart is empty
                  </h2>
                  <button
                    onClick={() => {
                      navigate("/product/airwayclear");
                      dispatch(toggleCart());
                    }}
                    className="bg-[#0d1b39] text-white px-6 py-2 rounded font-semibold text-sm"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl px-6 md:px-4 w-full">
                  {cartItems.map((item) => (
                    <div className="border-b py-4">
                      <div key={item?.id} className="flex gap-4">
                        <img
                          src={item?.image}
                          alt={item?.sectionTitle}
                          className="w-20 h-20 object-contain"
                        />

                        <div className="flex-1">
                          {(item?.type === 'guide' || item?.id === 'guideStandalone') ? (
                            <Link
                              to="/product/home-medic-a-guide-for-household-emergencies"
                              className="font-semibold"
                              onClick={() => dispatch(toggleCart())}
                            >
                              {item?.sectionTitle}
                            </Link>
                          ) : (
                            <h3 className="font-semibold">{item?.sectionTitle}</h3>
                          )}

                          {item?.id !== "guideStandalone" && (
                            <>
                              <div className="mt-1">
                                {item?.oneItemOriginalPrice && (
                                  <span className="line-through text-gray-400 text-sm mr-2">
                                    {item?.oneItemOriginalPrice.toLocaleString(
                                      "en-US",
                                      { style: "currency", currency: "USD" }
                                    )}
                                  </span>
                                )}
                                <span className="text-sm font-semibold">
                                  {item?.oneItemPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })}
                                </span>
                              </div>
                            </>
                          )}

                          {item?.title && (
                            <p className="text-sm mt-1 font-medium text-[#121212f3]">
                              Offer: Buy One
                            </p>
                          )}

                          {item?.title && (
                            <div className="mt-1 text-xs font-medium flex items-center gap-1 text-[#121212f3]">
                              <MdOutlineDiscount /> <span>{item?.title}</span>
                            </div>
                          )}

                          {/* Quantity and Delete */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center border rounded px-2">
                              <button
                                className="text-lg px-2"
                                onClick={() =>
                                  dispatch(
                                    updateItemQuantity({
                                      id: item.id,
                                      quantity: Math.max(1, item.quantity - 1),
                                    })
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                className="text-lg px-2"
                                onClick={() => {
                                  // Prevent manual increment for free guide
                                  if (
                                    item.type === "guide" &&
                                    item.freeQty >= item.quantity
                                  ) {
                                    handleAddCart();
                                    setErrorMessages((prev) => ({
                                      ...prev,
                                      [item.id]:
                                        "You can only add 1 of this item to your cart.",
                                    }));
                                    setTimeout(() => {
                                      setErrorMessages((prev) => {
                                        const newErrors = { ...prev };
                                        delete newErrors[item.id];
                                        return newErrors;
                                      });
                                    }, 5000);
                                    return;
                                  }
                                  dispatch(
                                    updateItemQuantity({
                                      id: item.id,
                                      quantity: item.quantity + 1,
                                    })
                                  );
                                }}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="text-red-500 ml-2"
                              onClick={() =>
                                dispatch(removeItemFromCart(item.id))
                              }
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col w-full items-end text-right">
                          {item?.id !== "guideStandalone" && (
                            <>
                              {item?.originalPrice && (
                                <div className="line-through text-gray-400 text-sm">
                                  {(
                                    parseFloat(item.quantity) *
                                    parseFloat(item.originalPrice)
                                  ).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })}
                                </div>
                              )}
                            </>
                          )}
                          <div className="text-base font-semibold">
                            {
                              item?.price && (
                                <>
                                  {(
                                    parseFloat(item.quantity) * parseFloat(item.price)
                                  ).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })}
                                </>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      {errorMessages[item.id] && (
                        <div className="px-4 text-red-600 font-medium text-sm">
                          ⚠️ {errorMessages[item.id]}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Suggest Guide if no guideIncluded exists */}
                  {!hasGuideIncluded && (
                    <>
                      <h3 className="font-bold text-lg mt-4 mb-2 px-4 text-[#121212e6]">
                        Frequently Bought Together
                      </h3>
                      <div
                        className="border rounded-xl p-4 text-[#121212e6] bg-[#f3f3f3]"
                        style={{
                          boxShadow: ".3rem .3rem 1rem rgba(0,0,0,.15)",
                        }}
                      >
                        <div className="flex gap-4 items-start">
                          <img
                            src="https://airwayclear.us/cdn/shop/files/Airwayclear.svg?v=1743450735&width=600"
                            alt="Guide"
                            className="w-16 h-16 object-contain"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-base">
                              Guide For Household Emergencies
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Learn how to handle bleeding, cardiac events, and
                              newborn emergencies—written by a real paramedic.
                              Over 60 pages of lifesaving tips every home should
                              have.
                            </p>
                            <div className="mt-2">
                              <span className="text-[#162950] font-bold text-base mr-2">
                                {(1200.0).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </span>
                              <span className="line-through font-bold text-xs">
                                {(4400.0).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
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
                    <span>
                      {subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <button
                    className={`w-full py-2 rounded-xl mt-4 transition font-bold text-lg ${cartItems.length === 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#162950] text-white"
                      }`}
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
            <div className="flex justify-center items-center flex-wrap gap-2 mb-6">
              <img src={payone} alt="Visa" />
              <img src={paytwo} alt="Amex" />
              <img src={paythird} alt="MasterCard" />
              <img src={payfour} alt="PayPal" />
              <img src={payfifth} alt="DPay" />
              <img src={paysix} alt="Apple Pay" />
              <img src={paysaven} alt="Google Pay" />
              <img src={payeaight} alt="Google Pay" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartModal;
