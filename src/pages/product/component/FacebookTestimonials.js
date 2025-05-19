import React from "react";
import {
  FaFaceLaughBeam,
  FaHeart,
  FaThumbsUp,
  FaFacebookF,
} from "react-icons/fa6";

const testimonials = [
  {
    name: "Mary Thompson",
    time: "11h",
    reactions: 193,
    text: `Airway Clear gives us the peace of mind we never knew we needed. With small kids at home, choking is always a worry, but having this on hand makes me feel ready for anything. It’s an absolute must for every household!`,
    image: "https://i.pravatar.cc/150?img=50",
  },
  {
    name: "Linda Martinez",
    time: "06h",
    reactions: 54,
    text: `I’m so grateful for this brand—it saved my grandson’s life. He started choking on a small toy, and in a moment of panic, I grabbed the device. It worked instantly, and he was breathing again within seconds. God bless you whoever made this product!`,
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Susan Reynolds",
    time: "03h",
    reactions: 83,
    text: `We decided to get it after hearing how vital it is to act fast in choking emergencies. This device is simple, reliable, and has quickly become an essential part of our safety plan. Every family should have one!`,
    image: "https://i.pravatar.cc/150?img=25",
  },
];

const FacebookBadge = () => (
  <div className="flex flex-col items-center text-center mb-4">
    <button className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-2 px-6 rounded-full text-sm shadow flex items-center justify-center gap-2">
      <FaFacebookF className="text-white text-sm" />
      VIRAL ON FACEBOOK RIGHT NOW
    </button>
    <p className="mt-3 text-sm text-[#162950]">
      <span className="inline-flex items-center gap-1">
        <FaThumbsUp className="text-[#1877F2] text-sm" />
        <FaHeart className="text-red-500 text-sm" />
        <FaFaceLaughBeam className="text-yellow-400 text-sm" />
        <strong>Lisa Damian, Mark Smith</strong> and{" "}
        <strong>48.3k others</strong>
      </span>
    </p>
  </div>
);

const TestimonialCard = ({ name, text, reactions, time, image }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-sm flex flex-col relative">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={image}
        alt={name}
        className="w-6 h-6 rounded-sm object-cover border"
      />
      <h3 className="text-blue-700 font-bold text-xl">{name}</h3>
    </div>
    <p className="text-lg text-gray-900 leading-relaxed mb-4">"{text}"</p>
    <div className="flex justify-between text-xs text-blue-600">
      <div className="flex gap-2">
        <span className="cursor-pointer">Like</span>
        <span className="cursor-pointer">Reply</span>
      </div>
      <span className="text-gray-500">{time}</span>
    </div>
    <div className="absolute -bottom-3 left-0 bg-white rounded-full shadow px-2 py-0.5 flex items-center space-x-1">
      <FaFaceLaughBeam className="text-yellow-400 text-lg" />
      <FaHeart className="text-red-500 text-lg" />
      <FaThumbsUp className="text-[#1877F2] text-lg" />
      <span className="text-lg text-gray-600 pl-1">{reactions}</span>
    </div>
  </div>
);

export default function FacebookTestimonials() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <FacebookBadge />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
