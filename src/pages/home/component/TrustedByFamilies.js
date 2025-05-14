import { useRef } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Danny Ruben Yacob",
    title: "Work marvelously.",
    text: `I had bought this and kept it for a couple of months, unsure when it would come in handy. Today, it helped extract a foreign object from my 8-month-old baby. It worked marvelously and gave me immense relief. I absolutely recommend keeping one around, especially if you have a toddler. Having this tool on hand provides peace of mind in case of emergencies. It's an essential item for every home with little ones!`,
    image: "/img1.jpg",
  },
  {
    name: "Alexander",
    title: "Great tool to have handy",
    text: `Great tool to have handy and easily accessible. Worth every penny. Our 9yr old son whom has Down Syndrome, was choking on his food. To the point he turned blue in the face. Being limited on his verbal skills it was difficult to understand him. Once we realized he was in distress we immediately applied the tool to use and worked a miracle.`,
    image: "/img2.jpg",
  },
  {
    name: "Tom",
    title: "Highly recommend!",
    text: `I purchased this kit for my restaurant, and it has given my staff the confidence to handle emergencies effectively. Knowing they are equipped to respond brings peace of mind to both employees and customers. The kit’s comprehensive contents ensure we are prepared for various situations.`,
    image: "/img3.jpg",
  },
];

export default function TrustedByFamilies() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
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
    <section className="bg-[#e6f1fb] py-12 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-green-500" />
          ))}
          <span className="text-sm font-semibold">
            Excellent <strong>(4.7/5)</strong> Based on 100k+ Customers
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          Trusted by <span className="text-blue-700">100,432+</span> families
          around the world
        </h2>

        <div className="relative">
          <Slider ref={sliderRef} {...settings} className="mb-8">
            {testimonials.map((t, i) => (
              <div key={i} className="px-2">
                <div className="bg-white rounded-xl shadow-md text-left p-4 h-full">
                  <img
                    src={t.image}
                    alt="testimonial"
                    className="h-48 w-full object-cover rounded-lg mb-4"
                  />
                  <div className="flex gap-1 text-green-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm mb-4">"{t.text}"</p>
                  <p className="text-sm font-semibold">
                    {t.name}{" "}
                    <span className="text-gray-500">● Verified Customer</span>
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>

        <button className="bg-green-600 text-white px-6 py-3 rounded-md font-bold hover:bg-green-700 transition">
          TAKE ACTION TODAY
        </button>

        <p className="text-sm font-semibold mt-4">100% MONEY BACK GUARANTEE</p>
      </div>
    </section>
  );
}
