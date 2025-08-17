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
    text: `LifeVac gives us the peace of mind we never knew we needed. With small kids at home, choking is always a worry, but having this on hand makes me feel ready for anything. It’s an absolute must for every household!`,
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
  // **NEW TESTIMONIALS ADDED**
  {
    name: "David Chen",
    time: "1d",
    reactions: 112,
    text: `As a paramedic, I've seen the worst-case scenarios. I bought a LifeVac for my own home because I know that every second counts. It's a professional-grade tool that's easy enough for anyone to use. Highly recommended.`,
    image: "https://i.pravatar.cc/150?img=60",
  },
  {
    name: "Jessica Miller",
    time: "2d",
    reactions: 78,
    text: `Our father has difficulty swallowing due to a medical condition. This device has already been used once to clear his airway. It's not just for kids. It's a life-saver for adults and the elderly too. Thank you, LifeVac.`,
    image: "https://i.pravatar.cc/150?img=45",
  },
   {
    name: "Robert Wilson",
    time: "3d",
    reactions: 230,
    text: `I never write reviews, but I had to for this. It saved my wife's life when she choked on a piece of steak. The back blows weren't working. This thing worked on the first pull. Don't hesitate, just get one.`,
    image: "https://i.pravatar.cc/150?img=68",
  },
];

const FacebookBadge = () => (
  <div className="flex flex-col items-center text-center mb-4">
    <button className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-2 px-6 rounded-full text-sm shadow flex items-center justify-center gap-2">
      <FaFacebookF className="text-white text-sm" />
      VIRAL ON FACEBOOK RIGHT NOW
    </button>
    <p className="md:mt-3 text-sm text-[#162950]">
      <span className="hidden md:inline-flex items-center gap-1">
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
  <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-sm flex flex-col relative h-full">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
      />
      <h3 className="text-blue-700 font-bold text-lg">{name}</h3>
    </div>
    <p className="text-sm text-[#162950] leading-relaxed mb-4 flex-grow">"{text}"</p>
    <div className="flex justify-between text-xs text-blue-600 mt-auto">
      <div className="flex gap-2">
        <span className="cursor-pointer hover:underline">Like</span>
        <span className="cursor-pointer hover:underline">Reply</span>
      </div>
      <span className="text-gray-500">{time}</span>
    </div>
    <div className="absolute -bottom-3 left-4 bg-white rounded-full shadow px-2 py-0.5 flex items-center space-x-1">
      <FaThumbsUp className="text-[#1877F2] text-lg" />
      <FaHeart className="text-red-500 text-lg" />
      <span className="text-sm text-gray-600 pl-1 font-semibold">{reactions}</span>
    </div>
  </div>
);

// **FIXED**: Accept 'onTakeAction' as a prop
export default function FacebookTestimonials({ onTakeAction }) {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <FacebookBadge />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* **FIXED**: Added the CTA button section */}
        <div className="mt-12 text-center">
            <button
                onClick={onTakeAction}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-24 py-4 rounded-lg text-lg shadow-lg w-full sm:w-auto transition-transform transform active:scale-95"
            >
                TAKE ACTION TODAY
            </button>
            <p className="text-xl font-semibold text-[#162950] mt-2">
                100% MONEY BACK GUARANTEE
            </p>
        </div>

      </div>
    </section>
  );
}
