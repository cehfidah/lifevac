import React from "react";
import Marquee from "react-fast-marquee";
const first = "https://ik.imagekit.io/g2qcghvoj/AAAA.webp";
const second = "https://ik.imagekit.io/g2qcghvoj/BBB.webp";
const third = "https://ik.imagekit.io/g2qcghvoj/CCC.webp";
const four = "https://ik.imagekit.io/g2qcghvoj/DDD.webp";
const fiveth = "https://ik.imagekit.io/g2qcghvoj/EEE.jpeg";
const sixth = "https://ik.imagekit.io/g2qcghvoj/GGG.webp";
const one = "https://ik.imagekit.io/g2qcghvoj/021.webp";
const two = "https://ik.imagekit.io/g2qcghvoj/022.jpeg";
const three = "https://ik.imagekit.io/g2qcghvoj/023.png";
const foure = "https://ik.imagekit.io/g2qcghvoj/024.png";
const five = "https://ik.imagekit.io/g2qcghvoj/025.png";


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
