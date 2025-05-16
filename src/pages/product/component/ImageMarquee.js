import React from "react";
import Marquee from "react-fast-marquee";
import first from "../../../assest/image/AAAA.webp";
import second from "../../../assest/image/BBB.webp";
import third from "../../../assest/image/CCC.webp";
import four from "../../../assest/image/DDD.webp";
import fiveth from "../../../assest/image/EEE.jpeg";
import sixth from "../../../assest/image/GGG.webp";
import one from "../../../assest/image/021.webp";
import two from "../../../assest/image/022.jpeg";
import three from "../../../assest/image/023.png";
import foure from "../../../assest/image/024.png";
import five from "../../../assest/image/025.png";

// Original images
const images = [first, second, third, four, fiveth, sixth];
const moreImages = [one, two, three, foure, five];

// Helper function to repeat images
const repeatImages = (imageArray, repeatCount = 3) => {
  const repeated = [];
  for (let i = 0; i < repeatCount; i++) {
    repeated.push(...imageArray);
  }
  return repeated;
};

const ImageMarquee = () => {
  const repeatedTopImages = repeatImages(images, 3);
  const repeatedBottomImages = repeatImages(moreImages, 3);

  return (
    <div className="w-full bg-white py-6 space-y-6">
      {/* Top Marquee */}
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {repeatedTopImages.map((src, index) => (
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
        {repeatedBottomImages.map((src, index) => (
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

export default ImageMarquee;
