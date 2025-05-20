import { useState, useRef, useEffect } from "react";
import Faq from "./Faq";
import OfferSelection from "./OfferSelection";

// Import images
import first from "../../../assest/image/firstsectioneaightimage.webp";
import second from "../../../assest/image/firstsectionfifthimage.webp";
import third from "../../../assest/image/firstsectionfirstimga.png";
import four from "../../../assest/image/firstsectionfourimage.webp";
import fifth from "../../../assest/image/firstsectionsecondimage.webp";
import six from "../../../assest/image/firstsectionsevenimage.webp";
import seven from "../../../assest/image/firstsectionsiximage.webp";
import eaghit from "../../../assest/image/firstsectionthirdimage.png";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const ProductShowcase = () => {
  const images = [first, second, third, four, fifth, seven, eaghit, six];
  const [mainImageIndex, setMainImageIndex] = useState(images.indexOf(six));
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

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setMainImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, images.length]);

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

  return (
    <div className="bg-white px-2 py-6 lg:p-10 font-sans max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Image Panel */}
        <div className="md:sticky md:top-6 md:self-start w-full md:w-1/2">
          {/* Desktop (md+): Thumbnails + Main Image */}
          <div className="hidden md:flex flex-col md:flex-row items-start gap-4">
            <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-16 h-16 object-cover rounded shadow cursor-pointer border-2 ${mainImageIndex === index
                    ? "border-blue-600"
                    : "border-transparent"
                    }`}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>
            <div
              ref={mainImageRef}
              className="relative w-full overflow-x-auto"
              style={{
                touchAction: "none",
                cursor: isMobile ? "default" : "grab",
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

          {/* Mobile (md-): Main image + horizontal thumbnails */}
          <div className="md:hidden flex flex-col gap-2">
            <div className="relative w-full">
              <img
                src={images[mainImageIndex]}
                alt="Main View"
                className="w-full rounded-lg shadow-lg select-none"
                draggable={false}
              />
              <div className="absolute top-[-20px] left-[-20px] bg-blue-700 text-white text-center rounded-full w-20 h-20 flex items-center justify-center shadow-md text-[10px] font-extrabold leading-tight">
                <div>
                  30
                  <br />
                  DAY MONEY
                  <br />
                  GUARANTEE
                </div>
              </div>
            </div>
            <div className="flex overflow-x-auto gap-2 mt-2 pb-1">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-16 h-16 object-cover rounded flex-shrink-0 cursor-pointer border-2 ${mainImageIndex === index
                    ? "border-blue-600"
                    : "border-transparent"
                    }`}
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
            {/* star */}
            <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-800">
              {/* Star rating icons */}
              <div className="flex space-x-0.5 text-green-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15l-5.878 3.09L5.64 12.18.76 7.91l6.17-.9L10 1l3.07 6.01 6.17.9-4.88 4.27 1.52 5.91z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-lg">
                Excellent <strong>(4.7/5)</strong> Based on 10k+ Reviews
              </p>
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-[40px] tracking-wide font-black text-gray-900 leading-snug mt-4"
              style={{
                lineHeight: "2.5rem",
              }}
            >
              AirwayClear™ -<br className="hidden sm:block" />
              Antichoking Device
            </h2>

            {/* Subheading */}
            <p className="mt-4 text-gray-800 text-base sm:text-lg">
              Prevent choking in <strong>under 20 seconds</strong> –{" "}
              <span className="text-[#162950] font-bold">2,379</span> Lives
              Saved
            </p>

            {/* Feature List */}
            <div className="rounded-xl mt-6 p-5 sm:p-6 shadow-xl">
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
                  <li
                    key={i}
                    className={`flex items-start gap-3 ${i < 4
                      ? "border-b border-dotted border-[#162950] pb-3"
                      : ""
                      }`}
                  >
                    <IoCheckmarkCircleSharp className="min-w-[20px] text-lg sm:text-xl mt-0.5 shrink-0" />
                    <span>
                      <strong>{highlight}</strong> {extra}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Update Notice */}
            <div className="bg-[#162950] text-white text-center mt-6 py-3 px-4 rounded-md font-medium text-sm sm:text-base">
              <p>
                UPDATE: We are currently out of stock on Amazon
                <br className="hidden sm:block" />
                and are only available here for a limited time
              </p>
            </div>
          </div>

          {/* Offers */}
          <OfferSelection />

          {/* FAQ */}
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
