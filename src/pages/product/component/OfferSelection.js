import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart, toggleCart } from "../../../store/slice/cartSlice";
import payone from "../../../assest/image/payment1.svg";
import paytwo from "../../../assest/image/payment2.svg";
import paythird from "../../../assest/image/payment3.svg";
import payfour from "../../../assest/image/payment4.svg";
import payfifth from "../../../assest/image/payment5.svg";
import paysix from "../../../assest/image/payment6.svg";
import paysaven from "../../../assest/image/payment7.svg";
import payeaight from "../../../assest/image/payment8.svg";
import { FaTruck } from "react-icons/fa6";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi2";
import offers from "../../../pages/product/component/offersData.js"; // Import the data

const OfferSelection = () => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState("offer2"); // Default to the most popular

    const handleSelectOffer = (offer) => {
        setSelectedId(offer.id);
    };

    const handleAddCart = () => {
        if (selectedId) {
            const offer = offers.find((o) => o.id === selectedId);
            if (offer) {
                dispatch(addItemToCart(offer)); // Only dispatch here
                dispatch(toggleCart());
            }
        }
    };

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 5); // 5 days from today

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 8); // 8 days from today (3 day gap)

    const formatDate = (date) =>
        `${format(date, "MMM")} (${format(date, "dd")})`;

    return (
        <>
            <div className="text-center">
<div className="flex items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-center text-lg font-bold">8 Left In Stock</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <br></br>
                {offers.map((offer, idx) => (
                    <div key={offer.id} className="relative">
                        <h4 className="text-sm font-bold text-[#162950] mb-2 uppercase text-start">
                            {idx === 0
                                ? "Protection For Yourself And Your Kid:"
                                : idx === 1
                                    ? "Protection For Your Close Family:"
                                    : "Protection For Your Large Family:"}
                        </h4>
                        {offer.tag && (
                            <div className="flex justify-end pr-1">
                                <div className=" bg-[#001532] text-white text-xs font-bold px-2 py-1 rounded-tl-md rounded-tr-md">
                                    {offer.tagText}
                                </div>
                            </div>
                        )}
                        <div
                            onClick={() => handleSelectOffer(offer)}
                            className={`border rounded-xl text-left shadow-md mb-6 cursor-pointer ${selectedId === offer.id
                                ? "border-blue-900 bg-blue-50"
                                : "hover:border-blue-400"
                                }`}
                        >
                            <div className="flex justify-between items-start gap-4 p-4">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={offer.image}
                                        alt="Kit"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                                <div>
                                    <span className="font-bold text-base md:text-xl">{offer.title}</span>
                                    <div className="text-sm border-2 border-gray-300 rounded-full px-3 py-1 font-bold bg-[#0085ff1a]">{offer.kits}</div>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">
                                        {offer?.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </span>
                                    <div className="text-sm line-through text-gray-400">
                                        {offer?.originalPrice.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </div>
                                    {!offer.guideIncluded && (
                                        <p className="bg-[#162950] text-white text-xs px-2 py-1 inline-block rounded mt-2">
                                            You Save &nbsp;
                                            {offer?.savings.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {offer.guideIncluded && (
                                <div
                                    className={`${offer.id === "offer2"
                                        ? "bg-[#001532] text-white"
                                        : "bg-[#0015324d] text-black"
                                        } flex justify-between items-center px-2 py-2 mt-2 rounded-br-xl rounded-bl-xl`}
                                >
                                    {/* <div className="flex gap-2 items-center text-sm mt-1">
                                    <Link to="/product/home-medic-a-guide-for-household-emergencies">
                                      <img
                                        src="/lifevacdevice.svg"
                                        alt="Guide"
                                        className="w-8 h-8 object-contain"
                                      />
                                    </Link>
                                    + <strong>FREE Home Medic Guide</strong>
                                  </div> */}
                                    <p className="bg-[#162950] text-white text-xs px-2 py-1 inline-block rounded">
                                        You Save &nbsp;
                                        {offer?.savings.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="border border-dashed border-black mb-4  rounded-md py-4 px-8 bg-[#f7fbff] flex items-center gap-5 text-[#1b2e4b]">
                    <FaTruck size={48} />
                    <div>
                        <p className="text-lg text-left">
                            Be prepared and get it between{" "}
                        </p>
                        <p className="text-lg text-left font-bold">
                            <span className="font-semibold">{formatDate(startDate)}</span> -{" "}
                            <span className="font-semibold">{formatDate(endDate)}</span>
                        </p>
                    </div>
                </div>

                {!selectedId && (
                    <p className="text-red-600 font-medium text-sm mb-2">Please select an offer before adding to cart.</p>
                )}

                <button
                    type="button"
                    onClick={handleAddCart}
                    className={`w-full text-white font-bold py-3 rounded text-lg transition-colors duration-200 ${selectedId
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!selectedId}
                >
                    <p className="flex items-center justify-center gap-4"><HiShieldCheck size={24} /> ADD TO CART</p>
                </button>

                {/* Payment Logos */}
                <OtherDataShow />
            </div>
        </>
    );
};

export default OfferSelection;

const OtherDataShow = () => {
    return (
        <>
            <div className="md:bg-[#f8fbff] md:px-4 py-4 rounded-lg mt-4 text-center md:shadow-sm md:border border-gray-200">
                <p className="font-bold text-[#162950] uppercase tracking-wider mb-3">
                    SSL Encrypted & Secure Payment With
                </p>
                <div className="flex justify-center items-center flex-wrap gap-2 mb-6">
                    <img src={payone} alt="Visa" />
                    <img src={paytwo} alt="Amex" />
                    <img src={paythird} alt="Mastercard" />
                    <img src={payfour} alt="PayPal" />
                    <img src={payfifth} alt="DPay" />
                    <img src={paysix} alt="Apple Pay" />
                    <img src={paysaven} alt="Google Pay" />
                    <img src={payeaight} alt="Google Pay" />
                </div>
                <div className="text-start flex flex-col gap-4 text-base md:text-lg tracking-wider">
                    <p className="font-semibold">
                        Meet LifeVac™, the lifesaving device designed to instantly
                        clear blocked airways, &nbsp;for toddlers, children and
                        adults.&nbsp;
                    </p>
                    <p>
                        Whether at the dinner table, playtime, or snack time, choking
                        accidents can happen in seconds, and traditional methods might fail
                        you in the heat of the moment.
                    </p>
                    <p>
                        With <strong className="font-semibold">LifeVac™</strong> you can
                        act confidently, offering an intuitive, no-training-needed solution
                        to prevent tragic outcomes.
                    </p>
                </div>
            </div>
        </>
    );
};