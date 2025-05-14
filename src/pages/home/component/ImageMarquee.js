import React from "react";
import Marquee from "react-fast-marquee";

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg",
];

const moreImages = [
  "/images/img9.jpg",
  "/images/img10.jpg",
  "/images/img11.jpg",
  "/images/img12.jpg",
  "/images/img13.jpg",
  "/images/img14.jpg",
  "/images/img15.jpg",
  "/images/img16.jpg",
];

const DoubleImageMarquee = () => {
  return (
    <div className="w-full bg-white py-6 space-y-6">
      {/* Top Marquee */}
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="mx-2 flex-shrink-0 border-4 border-blue-200 rounded-xl overflow-hidden p-1 bg-white shadow-md"
          >
            <img
              src={src}
              alt={`Top Item ${index + 1}`}
              className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 object-cover rounded-md"
            />
          </div>
        ))}
      </Marquee>

      {/* Bottom Marquee */}
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        direction="right"
        className="overflow-hidden"
      >
        {moreImages.map((src, index) => (
          <div
            key={index}
            className="mx-2 flex-shrink-0 border-4 border-blue-200 rounded-xl overflow-hidden p-1 bg-white shadow-md"
          >
            <img
              src={src}
              alt={`Bottom Item ${index + 1}`}
              className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 object-cover rounded-md"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default DoubleImageMarquee;
