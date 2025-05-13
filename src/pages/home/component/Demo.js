import download from "../../../assest/download.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Faq from "./Faq";

const Demo = () => {
  return (
    <div className="bg-white p-6 lg:p-10 font-sans max-w-screen-xl mx-auto">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Sticky Image Panel */}
        <div className="sticky top-6 self-start">
          <div className="flex flex-col items-center gap-4">
            <div className="flex">
              <div className="flex flex-col gap-2 pr-3">
                <img
                  src="https://i.imgur.com/w8ml9d1.png"
                  alt="thumb1"
                  className="w-16 h-16 object-cover rounded shadow"
                />
                <img
                  src="https://i.imgur.com/vGbmhsc.png"
                  alt="thumb2"
                  className="w-16 h-16 object-cover rounded shadow"
                />
                <img
                  src="https://i.imgur.com/OmpMnFF.png"
                  alt="thumb3"
                  className="w-16 h-16 object-cover rounded shadow"
                />
                <img
                  src="https://i.imgur.com/5C8NHTN.png"
                  alt="thumb4"
                  className="w-16 h-16 object-cover rounded shadow"
                />
                <img
                  src="https://i.imgur.com/85vDLp6.png"
                  alt="thumb5"
                  className="w-16 h-16 object-cover rounded shadow"
                />
              </div>

              <div className="relative">
                <img
                  src="https://i.imgur.com/2yYj3DR.png"
                  alt="main airwayclear set"
                  className="w-[280px] rounded-lg shadow-lg"
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
        </div>

        {/* Right Scrollable Info */}
        <div className="flex flex-col gap-6 pr-2 max-h-[90vh] overflow-y-auto md:overflow-visible md:max-h-full">
          {/* Product Description */}
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

          {/* Offers */}
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
              <p className="text-sm mt-1">
                + <strong>FREE Home Medic Guide</strong>
              </p>
              <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded mt-2">
                You save Rs. 11,402.66
              </p>
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
              <p className="text-sm mt-1">
                + <strong>FREE Home Medic Guide</strong>
              </p>
              <p className="bg-blue-900 text-white text-xs px-2 py-1 inline-block rounded mt-2">
                You save Rs. 21,878.76
              </p>
            </div>

            <div className="border border-dashed border-black text-sm text-gray-700 p-3 mb-4 rounded">
              🛫 Be prepared and get it between{" "}
              <strong>May (18) - May (21)</strong>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded text-lg">
              ✅ ADD TO CART
            </button>

            {/* Offer 4 - SSL & Payment Info */}
            <div className="bg-[#f8fbff] px-6 py-8 sm:px-10 md:px-16 lg:px-24 xl:px-32 rounded-lg mt-8 text-center shadow-sm border border-gray-200">
              <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-3">
                SSL Encrypted & Secure Payment With
              </p>
              <div className="flex justify-center items-center flex-wrap gap-2 mb-6">
                <img
                  src="https://i.imgur.com/fnOUGgT.png"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://i.imgur.com/RISZlC1.png"
                  alt="Amex"
                  className="h-6"
                />
                <img
                  src="https://i.imgur.com/DaZVSeT.png"
                  alt="MasterCard"
                  className="h-6"
                />
                <img
                  src="https://i.imgur.com/9OKc4Zx.png"
                  alt="PayPal"
                  className="h-6"
                />
                <img
                  src="https://i.imgur.com/BmKxXHx.png"
                  alt="DPay"
                  className="h-6"
                />
                <img
                  src="https://i.imgur.com/Tji3Kqv.png"
                  alt="Apple Pay"
                  className="h-6"
                />
                <img
                  src="https://i.imgur.com/5prLBBw.png"
                  alt="Google Pay"
                  className="h-6"
                />
              </div>
              <h2 className="text-lg md:text-lg font-extrabold text-blue-900 mb-3 text-start">
                Meet Airway Clear™, the lifesaving device designed to{" "}
                <br className="hidden sm:inline" />
                instantly clear blocked airways, for toddlers, children and
                adults.
              </h2>
              <p className="text-gray-800 text-sm md:text-base mb-4 max-w-2xl mx-auto text-start">
                Whether at the dinner table, playtime, or snack time, choking
                accidents can happen in seconds, and traditional methods might
                fail you in the heat of the moment.
              </p>
              <p className="text-gray-800 text-sm md:text-base max-w-2xl mx-auto text-start">
                With <strong className="text-blue-900">Airway Clear™</strong>{" "}
                you can act confidently, offering an intuitive,
                no-training-needed solution to prevent tragic outcomes.
              </p>
            </div>
            <Faq />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
