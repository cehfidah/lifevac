import React, { useState, useRef } from "react";
import faqs from "../../../pages/product/component/faqData.js"; // Import the data

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const sliderRef = useRef(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const goToNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  return (
    <div>
      <div className="mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded mb-3 shadow-sm">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-base md:text-xl font-bold text-[#162950] bg-gray-100 hover:bg-gray-200 tracking-wider leading-relaxed"
            >
              {faq.title}
              <span className="text-base md:text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white text-sm md:text-base text-[#162950] leading-relaxed tracking-wider">
                {faq.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}