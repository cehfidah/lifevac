import { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Faq from "./Faq";

// Import images
import first from "../../../assest/image/firstsectioneaightimage.webp";
import second from "../../../assest/image/firstsectionfifthimage.webp";
import third from "../../../assest/image/firstsectionfirstimga.png";
import four from "../../../assest/image/firstsectionfourimage.webp";
import fifth from "../../../assest/image/firstsectionsecondimage.webp";
import six from "../../../assest/image/firstsectionsevenimage.webp";
import seven from "../../../assest/image/firstsectionsiximage.webp";
import eaghit from "../../../assest/image/firstsectionthirdimage.png";

import payone from "../../../assest/image/payment1.svg";
import paytwo from "../../../assest/image/payment2.svg";
import paythird from "../../../assest/image/payment3.svg";
import payfour from "../../../assest/image/payment4.svg";
import payfifth from "../../../assest/image/payment5.svg";
import paysix from "../../../assest/image/payment6.svg";
import paysaven from "../../../assest/image/payment7.svg";
import payeaight from "../../../assest/image/payment8.svg";

const Demo = () => {
  const images = [first, second, third, four, fifth, seven, eaghit, six];
  const [mainImageIndex, setMainImageIndex] = useState(images.indexOf(six));
  const mainImageRef = useRef(null);
  const isDragging = useRef(false); // Track dragging state
  const startX = useRef(0); // Mouse start position
  const scrollLeft = useRef(0); // Initial scroll position

  // Mouse down event to start dragging
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = mainImageRef.current.scrollLeft;
    mainImageRef.current.style.cursor = "grabbing";
  };

  // Mouse leave event to stop dragging
  const handleMouseLeave = () => {
    isDragging.current = false;
    mainImageRef.current.style.cursor = "grab";
  };

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    isDragging.current = false;
    mainImageRef.current.style.cursor = "grab";
  };

  // Mouse move event to move the image
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    mainImageRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Handle mouse wheel to change the image (optional)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        // Scroll down (next image)
        setMainImageIndex((prev) => (prev + 1) % images.length);
      } else {
        // Scroll up (previous image)
        setMainImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    };

    const imgContainer = mainImageRef.current;
    if (imgContainer) {
      imgContainer.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (imgContainer) {
        imgContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [images.length]);

  return (
    <div className="bg-white p-6 lg:p-10 font-sans max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Image Panel */}
        <div className="md:sticky md:top-6 md:self-start w-full md:w-1/2">
          <div className="flex flex-col md:flex-row items-start gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 md:overflow-y-auto max-h-[400px] md:max-h-[500px] pr-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-16 h-16 object-cover rounded shadow cursor-pointer border-2 ${
                    mainImageIndex === index
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div
              ref={mainImageRef}
              className="relative w-full overflow-x-auto"
              style={{
                touchAction: "none",
                cursor: "grab",
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <img
                src={images[mainImageIndex]}
                alt="Main View"
                className="w-full rounded-lg shadow-lg select-none"
                draggable={false}
              />
              <div className="absolute top-[-30px] left-[-30px] bg-blue-700 text-white text-center rounded-full w-24 h-24 flex items-center justify-center shadow-md text-xs font-extrabold leading-tight">
                <div>
                  30
                  <br />
                  DAY MONEY
                  <br />
                  GUARANTEE
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white text-center px-3 py-2 mt-4 font-bold rounded shadow-md text-xs md:text-sm w-full">
            FREE LIFE-TIME REPLACEMENTS WHEN USED IN EMERGENCY
          </div>
        </div>

        {/* Right Product Info */}
        <div className="flex flex-col gap-6 pr-2 overflow-y-auto md:overflow-visible max-h-full w-full md:w-1/2">
          {/* Product title, description, and offer sections */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
              AirwayClear™ -<br />
              Antichoking Device
            </h2>
            <p className="mt-3 text-gray-800 text-lg">
              Prevent choking in <strong>under 20 seconds</strong> –{" "}
              <span className="text-blue-600 font-bold">2,379</span> Lives Saved
            </p>
            <div className="bg-gray-50 border border-gray-300 rounded-xl mt-5 p-5 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-4 underline">
                OVER 100,432+ SOLD, THIS IS WHY:
              </h3>
              <ul className="space-y-3 text-gray-800 text-base">
                <li>
                  ✅ <strong>Saves Lives</strong> in Under 20 Seconds
                </li>
                <li>
                  ✅ No Training Needed – <strong>1-Step Operation</strong>
                </li>
                <li>
                  ✅ <strong>Universal</strong> Design for{" "}
                  <strong>Adults & Children</strong>
                </li>
                <li>
                  ✅ <strong>Self-Applicable</strong> in a Crisis
                </li>
                <li>
                  ✅ Used in an Emergency? <strong>Get a Free One!</strong>
                </li>
              </ul>
            </div>
            <div className="bg-blue-800 text-white text-center mt-4 py-2 rounded font-medium text-sm md:text-base">
              UPDATE: We are currently out of stock on Amazon <br />
              and are only available here for a limited time
            </div>
          </div>

          {/* Offers Section */}
          <div className="text-center">
            <p className="font-semibold text-sm mb-1">8 Left In Stock</p>

            {/* Offer 1 */}
            <div className="border rounded-xl p-4 text-left shadow-md mb-6">
              <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase">
                Protection For Yourself And Your Kid:
              </h4>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg">BUY ONE</span>
                <span className="font-semibold text-gray-800">
                  Rs. 3,448.67
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">1x Full Kit</p>
              <p className="text-sm line-through text-gray-400">Rs. 6,100.00</p>
              <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded mt-2">
                You Save Rs. 2,651.33
              </p>
            </div>

            {/* Offer 2 */}
            <div className="border-2 border-blue-400 bg-blue-50 rounded-xl p-4 text-left shadow-md mb-6 relative">
              <div className="absolute top-2 right-2 bg-blue-900 text-white text-xs px-2 py-1 rounded">
                MOST POPULAR
              </div>
              <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase">
                Protection For Your Close Family:
              </h4>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg">BUY 2 GET 1 FREE</span>
                <span className="font-semibold text-gray-800">
                  Rs. 6,897.34
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">3x Full Kits</p>
              <p className="text-sm line-through text-gray-400">
                Rs. 18,300.00
              </p>
              <div className="flex justify-between items-center bg-[#001532] px-2 py-2 mt-2">
                <p className="text-sm mt-1 text-white">
                  + <strong>FREE Home Medic Guide</strong>
                </p>
                <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded ">
                  You save Rs. 11,402.66
                </p>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="border-2 border-blue-900 rounded-xl p-4 text-left shadow-md mb-6 relative">
              <div className="absolute top-2 right-2 bg-blue-900 text-white text-xs px-2 py-1 rounded">
                MOST SAVINGS
              </div>
              <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase">
                Protection For Your Large Family:
              </h4>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg">BUY 3 GET 2 FREE</span>
                <span className="font-semibold text-gray-800">
                  Rs. 8,621.24
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">5x Full Kits</p>
              <p className="text-sm line-through text-gray-400">
                Rs. 30,500.00
              </p>
              <div className="flex justify-between items-center bg-[#0015324D] px-2 py-2 mt-2">
                <p className="text-sm mt-1">
                  + <strong>FREE Home Medic Guide</strong>
                </p>
                <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded">
                  You save Rs. 21,878.76
                </p>
              </div>
            </div>

            <div className="border border-dashed border-black text-sm text-gray-700 p-3 mb-4 rounded">
              🛫 Be prepared and get it between{" "}
              <strong>May (18) - May (21)</strong>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded text-lg">
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

          <Faq />
        </div>
      </div>
    </div>
  );
};

export default Demo;
