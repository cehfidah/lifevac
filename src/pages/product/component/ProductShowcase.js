import { useState, useRef, useEffect } from "react";
import Faq from "./Faq";
import OfferSelection from "./OfferSelection";


import { IoCheckmarkCircleSharp } from "react-icons/io5";

// **FIXED**: Accept 'onTakeAction' as a prop
const ProductShowcase = ({ onTakeAction }) => {
const first = "https://ik.imagekit.io/g2qcghvoj/lifevac.png?updatedAt=1755523615067";
const firstsecond ="https://ik.imagekit.io/g2qcghvoj/home%20and%20traval%20kit.webp";
const firstthird = "https://ik.imagekit.io/g2qcghvoj/life%20vac%20(17).png?updatedAt=1755692110488";
const second = "https://ik.imagekit.io/g2qcghvoj/firstsectionsevenimage.webp?updatedAt=1755523907812";
const third = "https://ik.imagekit.io/g2qcghvoj/firstsectionfifthimage.webp?updatedAt=1755523907900";
const four = "https://ik.imagekit.io/g2qcghvoj/firstsectioneaightimage.webp?updatedAt=1755523907681";
const fifth = "https://ik.imagekit.io/g2qcghvoj/firstsectionsecondimage.webp?updatedAt=1755523907655";
const six = "https://ik.imagekit.io/g2qcghvoj/firstsectionfourimage.webp?updatedAt=1755523907939";
const seven = "https://ik.imagekit.io/g2qcghvoj/firstsectionsiximage.jpg?updatedAt=1755525946084";
  const images = [
    firstsecond,
    firstthird,
  second,
  third,
  four,
  fifth,
  six,
  seven
];
// After
const [mainImageIndex, setMainImageIndex] = useState(0);
  const mainImageRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  const handleMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = mainImageRef.current.scrollLeft;
    mainImageRef.current.style.cursor = "grabbing";
  };
  const handleMouseLeave = () => {
    if (isMobile) return;
    isDragging.current = false;
    mainImageRef.current.style.cursor = "grab";
  };
  const handleMouseUp = () => {
    if (isMobile) return;
    isDragging.current = false;
    mainImageRef.current.style.cursor = "grab";
  };
  const handleMouseMove = (e) => {
    if (isMobile) return;
    if (!isDragging.current) return;
    const x = e.clientX;
    const walk = (x - startX.current) * 2;
    mainImageRef.current.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setMainImageIndex((prev) => (prev + 1) % images.length);
      } else {
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
  }, [images.length, isMobile]);

  const getNextDayFormatted = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return tomorrow.toLocaleDateString('en-US', options);
  };
  const nextDayFormatted = getNextDayFormatted();

  return (
    <div className="bg-white px-4 py-6 lg:p-10 font-sans max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Image Panel */}
        <div className="md:sticky md:top-6 md:self-start w-full md:w-1/2">
          <div className="hidden md:flex flex-col md:flex-row items-start gap-4">
            <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-16 h-16 object-cover rounded shadow cursor-pointer border-2 ${mainImageIndex === index ? "border-blue-600" : "border-transparent"}`}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>
            <div
              ref={mainImageRef}
              className="relative w-full overflow-x-auto"
              style={{ touchAction: "none", cursor: isMobile ? "default" : "grab" }}
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
            
            </div>
          </div>
          <div className="md:hidden flex flex-col gap-2">
            <div className="relative w-full">
              <img
                src={images[mainImageIndex]}
                alt="Main View"
                className="w-full rounded-lg shadow-lg select-none"
                draggable={false}
              />
            
            </div>
            <div className="flex overflow-x-auto gap-2 mt-2 pb-1">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-16 h-16 object-cover rounded flex-shrink-0 cursor-pointer border-2 ${mainImageIndex === index ? "border-blue-600" : "border-transparent"}`}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#162950] text-white text-center px-3 py-2 mt-4 font-bold rounded shadow-md text-xs md:text-sm w-full">
            FREE LIFE-TIME REPLACEMENTS WHEN USED IN EMERGENCY
          </div>
        </div>

        {/* Right Product Info */}
        <div className="flex flex-col gap-6 pr-2 overflow-y-auto md:overflow-visible max-h-full w-full md:w-1/2">
          <div className="pb-8">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base md:text-lg text-gray-800">
       <div className="flex space-x-0.5 text-green-500">
  {[...Array(5)].map((_, i) => (
    <svg
      key={i}
      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
      viewBox="0 0 24 24" // Using a 24x24 viewBox for a standard, well-proportioned star
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Green square background. "currentColor" uses the text-green-500 from the parent div. */}
      <rect width="24" height="24" fill="currentColor" />

      {/* White star path on top of the square */}
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill="white"
      />
    </svg>
  ))}
</div>
              <p className="text-sm sm:text-base md:text-lg">
                Excellent <strong>(4.7/5)</strong> Based on 10k+ Reviews
              </p>
            </div>
            <h2
              className="text-3xl md:text-[40px] tracking-wide font-black text-gray-900 leading-snug mt-4"
              style={{ lineHeight: "2.5rem" }}
            >
              LifeVac™ -<br className="hidden sm:block" />
              Antichoking Device
            </h2>
            <p className="mt-4 text-gray-800 text-base sm:text-lg">
              Prevent choking in <strong>under 20 seconds</strong> –{" "}
              <span className="text-[#162950] font-bold">2,379</span> Lives Saved
            </p>
            <div className="rounded-xl mt-6 p-2 sm:p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-[#162950] mb-4 underline">
                OVER 100,432+ SOLD, THIS IS WHY:
              </h3>
              <ul className="space-y-4 text-[#162950] text-sm sm:text-base">
                {[
                  ["Saves Lives", "in Under 20 Seconds"],
                  ["No Training Needed", "1-Step Operation"],
                  ["Universal Design", "for Adults & Children"],
                  ["Self-Applicable", "in a Crisis"],
                  ["Used in an Emergency?", "Get a Free One!"],
                ].map(([highlight, extra], i) => (
                  <li key={i} className={`flex items-start gap-3 ${i < 4 ? "border-b border-dotted border-[#162950] pb-3" : ""}`}>
                    <IoCheckmarkCircleSharp className="min-w-[20px] text-lg sm:text-xl mt-0.5 shrink-0" />
                    <span><strong>{highlight}</strong> {extra}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* **FIXED**: Added a functional "TAKE ACTION TODAY" button 
            <div className="mt-6 text-center">
                <button 
                    onClick={onTakeAction}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg text-lg shadow-lg transition-transform transform active:scale-95"
                >
                    TAKE ACTION TODAY
                </button>
            </div>
            */}

            <div className="bg-[#162950] text-white text-center mt-6 py-3 px-4 rounded-md font-medium text-sm sm:text-base">
              <p>PRICE RETURNS TO $79.99 PER UNIT STARTING {nextDayFormatted}</p>
            </div>
          </div>
          <OfferSelection />
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
