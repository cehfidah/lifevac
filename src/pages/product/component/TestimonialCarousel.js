import React, { useRef } from "react";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    title: "My son is alive because of this",
    content:
      "My 1 year old choked on a grape a few weeks ago. I tried backblows which didn't work, I grabbed the lifevac device and it sucked the grape right out. This device saved his life.",
    name: "Libbie Dobbs",
    role: "Verified Customer",
  },
  {
    title: "Perfect for my grandchildren",
    content:
      "So far, I have only used this product for prevention, and it gives me peace of mind knowing we’re prepared for choking emergencies. The quality is excellent, and the packaging was secure, which I appreciated.",
    name: "John Weaver",
    role: "Verified Customer",
  },
  {
    title: "Extremely valuable",
    content:
      "It's a very small price to pay when you consider that the alternative could be much worse, possibly even a coffin. The peace of mind this brings is worth every penny for such a crucial product.",
    name: "Celine Andrez",
    role: "Verified Customer",
  },
];

const TestimonialCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Hide default arrows completely
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#f2fcff] py-12 px-4 text-center">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-2">
          <div className="flex text-green-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar key={i} />
              ))}
          </div>
          <p className="text-sm text-[#162950]">
            <span className="font-semibold">Excellent (4.7/5)</span> Based on
            100k+ Customers
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#162950] mb-10">
          Actively protecting <span className="underline">100,432+</span>{" "}
          households
        </h2>

        {/* Slider */}
        <Slider {...settings} ref={sliderRef}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-3">
              <div className="border border-black/50 rounded-xl p-6 text-left bg-white shadow-sm h-full">
                <div className="flex text-green-500 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <h3 className="font-bold text-[#162950] mb-2 text-xl">
                  {testimonial.title}
                </h3>
                <p className="text-[#162950] text-base md:text-lg mb-4">
                  “{testimonial.content}”
                </p>
                <p className="text-sm font-semibold text-[#162950]">
                  {testimonial.name}{" "}
                  <span className="text-[#162950]">• {testimonial.role}</span>
                </p>
              </div>
            </div>
          ))}
        </Slider>

        {/* Unified Prev/Next buttons below slider for all screen sizes */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="flex items-center gap-1 bg-[#162950] text-white px-4 py-2 rounded-full"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaArrowLeft /> Prev
          </button>
          <button
            className="flex items-center gap-1 bg-[#162950] text-white px-4 py-2 rounded-full"
            onClick={() => sliderRef.current.slickNext()}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
