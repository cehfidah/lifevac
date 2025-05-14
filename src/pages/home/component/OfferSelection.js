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

const OfferSelection = () => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null);

    const handleSelectOffer = (offer) => {
        setSelectedId(offer.id);
        dispatch(addItemToCart(offer));
    };

    const handleAddCart = () => {
        if (selectedId) {
            dispatch(toggleCart());
        }
    }

    const offers = [
        {
            id: 'offer1',
            title: 'BUY ONE',
            kits: '1x Full Kit',
            price: 3448.67,
            originalPrice: 6100.00,
            savings: 2651.33,
            guideIncluded: false,
            image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_3_300x300.svg?v=1737985220"
        },
        {
            id: 'offer2',
            title: 'BUY 2 GET 1 FREE',
            kits: '3x Full Kits',
            price: 6897.34,
            originalPrice: 18300.00,
            savings: 11402.66,
            guideIncluded: true,
            image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_2_300x300.svg?v=1737985180"
        },
        {
            id: 'offer3',
            title: 'BUY 3 GET 2 FREE',
            kits: '5x Full Kits',
            price: 8621.24,
            originalPrice: 30500.00,
            savings: 21878.76,
            guideIncluded: true,
            image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_4_300x300.svg?v=1737985322"
        },
    ];
    return (
        <>
            <div className="text-center">
                <p className="font-semibold text-sm mb-1">8 Left In Stock</p>

                {offers.map((offer, idx) => (
                    <div
                        key={offer.id}
                        onClick={() => handleSelectOffer(offer)}
                        className={`border rounded-xl p-4 text-left shadow-md mb-6 cursor-pointer ${selectedId === offer.id ? 'border-blue-900 bg-blue-50' : 'hover:border-blue-400'
                            }`}
                    >
                        <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase">
                            {idx === 0
                                ? 'Protection For Yourself And Your Kid:'
                                : idx === 1
                                    ? 'Protection For Your Close Family:'
                                    : 'Protection For Your Large Family:'}
                        </h4>

                        <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-lg">{offer.title}</span>
                            <span className="font-semibold text-gray-800">Rs. {offer.price}</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">{offer.kits}</p>
                        <p className="text-sm line-through text-gray-400">Rs. {offer.originalPrice}</p>

                        <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded mt-2">
                            You Save Rs. {offer.savings}
                        </p>

                        {offer.guideIncluded && (
                            <div className="flex justify-between items-center bg-[#001532] px-2 py-2 mt-2">
                                <p className="text-sm mt-1 text-white">
                                    + <strong>FREE Home Medic Guide</strong>
                                </p>
                                <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded">
                                    Free Bonus
                                </p>
                            </div>
                        )}
                    </div>
                ))}

                <div className="border border-dashed border-black text-sm text-gray-700 p-3 mb-4 rounded">
                    🛫 Be prepared and get it between <strong>May (18) - May (21)</strong>
                </div>


                <button type="button" onClick={handleAddCart} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded text-lg" disabled={!selectedId}>
                    ✅ ADD TO CART
                </button>

                {/* Payment Logos */}
                <div className="bg-[#f8fbff] px-4 py-4 rounded-lg mt-8 text-center shadow-sm border border-gray-200">
                    <p className=" font-bold text-gray-700 uppercase tracking-wider mb-3">
                        SSL Encrypted & Secure Payment With
                    </p>
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
                    <div className="text-start flex flex-col gap-4">
                        <p className="font-bold">
                            Meet Airway Clear™, the lifesaving device designed to
                            instantly clear blocked airways, &nbsp;for toddlers, children
                            and adults.&nbsp;
                        </p>
                        <p>
                            Whether at the dinner table, playtime, or snack time, choking
                            accidents can happen in seconds, and traditional methods might
                            fail you in the heat of the moment.
                        </p>
                        <p>
                            With <strong className="font-bold">Airway Clear™</strong> you
                            can act confidently, offering an intuitive, no-training-needed
                            solution to prevent tragic outcomes.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfferSelection
