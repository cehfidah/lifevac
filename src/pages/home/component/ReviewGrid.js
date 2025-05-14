import React, { useState } from "react";
import first from "../../../assest/image/imageone.jpeg";
import second from "../../../assest/image/imagetwo.webp";
import third from "../../../assest/image/imagefour.webp";
import four from "../../../assest/image/imagefour.webp";

const reviews = [
  {
    id: 1,
    name: "Danny Ruben Yaacb",
    country: "🇺🇸",
    rating: 5,
    date: "05/11/2024",
    content:
      "Had bought and kept this for a couple of months not knowing when it would come of value but today it help in extracting a foreign object from an 8 month baby. Work marvelously.",
    image: first,
  },
  {
    id: 2,
    name: "Tom",
    country: "🇺🇸",
    rating: 5,
    date: "05/13/2024",
    content:
      "I purchased this kit for my restaurant, and it's given my staff the confidence to handle emergencies. Highly recommend!",
    image: second,
  },
  {
    id: 3,
    name: "Buyyyyy",
    country: "🇺🇸",
    rating: 5,
    date: "05/08/2024",
    content:
      "Looks good. I don't want to ever have to use it! Instructions are clear enough even my children AND husband can follow them!",
    image: third,
  },
  {
    id: 4,
    name: "Destiny",
    country: "🇺🇸",
    rating: 5,
    date: "05/01/2024",
    content:
      "The suction is really good. Almost pulled my face off trying to test it 😂👍. I definitely feel more relieved having this around for my little one!",
    image: four,
  },
];

const ratingsBreakdown = [
  { stars: 5, count: 69 },
  { stars: 4, count: 6 },
  { stars: 3, count: 3 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ReviewGrid() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortType, setSortType] = useState("date");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.content ||
      selectedStars === 0
    ) {
      alert("Please fill all fields and select a star rating.");
      return;
    }

    console.log("Review Submitted:");
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Rating:", selectedStars);
    console.log("Content:", formData.content);
    console.log("Image File:", selectedImage);

    alert("Review submitted!");
    setShowForm(false);
    setFormData({ name: "", email: "", content: "" });
    setSelectedStars(0);
    setHoveredStar(0);
    setSelectedImage(null);
  };

  return (
    <section className="px-4 py-8 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="bg-blue-900 text-white text-center rounded p-4 w-16 h-16 flex flex-col justify-center items-center">
              <div className="text-xl font-bold">4.8</div>
              <div className="text-[10px]">out of 5</div>
            </div>
            <div className="text-gray-700 text-sm">Based on 78 reviews</div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-900 text-white px-4 py-2 rounded text-sm self-start md:self-auto"
          >
            {showForm ? "Close review form" : "Write a review"}
          </button>
        </div>

        {/* Ratings Breakdown */}
        <div className="flex flex-col gap-2 mb-8">
          {ratingsBreakdown.map(({ stars, count }) => (
            <div
              key={stars}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <div className="flex items-center gap-0.5">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < stars ? "text-gray-400" : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
              </div>
              <div className="bg-gray-200 rounded h-2 w-40 relative">
                <div
                  className="bg-gray-500 h-2 rounded absolute top-0 left-0"
                  style={{ width: `${(count / 78) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 ml-2">({count})</div>
            </div>
          ))}
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="border-t border-gray-300 pt-6 mb-8">
            <h3 className="text-center text-lg font-semibold text-gray-700 mb-2">
              Write a Review
            </h3>

            {/* Star Selector */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setSelectedStars(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= (hoveredStar || selectedStars)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="border px-3 py-2 rounded text-sm w-full"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                className="border px-3 py-2 rounded text-sm w-full"
                placeholder="Your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <textarea
              className="border px-3 py-2 rounded text-sm w-full mb-4 min-h-[100px]"
              placeholder="Enter your feedback here"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>

            <div className="border border-dashed border-gray-300 px-4 py-2 rounded text-center text-sm text-gray-500 mb-4">
              <label className="cursor-pointer flex items-center gap-1 mx-auto">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm3 3v4l4-2-4-2z" />
                </svg>
                <span>{selectedImage ? selectedImage.name : "Add photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-900 text-white px-6 py-2 rounded text-sm"
              >
                Submit review
              </button>
            </div>
          </div>
        )}

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left mb-6">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-blue-900 hover:bg-gray-50 focus:outline-none"
          >
            Sort reviews
            <svg
              className="ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
            </svg>
          </button>

          {showDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    setSortType("date");
                    setShowDropdown(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sort by Date
                </button>
                <button
                  onClick={() => {
                    setSortType("content");
                    setShowDropdown(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sort by Content
                </button>
                <button
                  onClick={() => {
                    setSortType("photo");
                    setShowDropdown(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sort by Photo
                </button>
                <button
                  onClick={() => {
                    setSortType("rate");
                    setShowDropdown(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sort by Rating
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...reviews]
            .sort((a, b) => {
              switch (sortType) {
                case "date":
                  return new Date(b.date) - new Date(a.date);
                case "content":
                  return b.content.length - a.content.length;
                case "photo":
                  return a.image ? -1 : 1;
                case "rate":
                  return b.rating - a.rating;
                default:
                  return 0;
              }
            })
            .map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={review.image}
                    alt="review"
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <span className="absolute top-1 right-1 bg-white/80 text-gray-600 text-xs rounded px-1 py-0.5">
                    1/1
                  </span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span>{review.name}</span>
                  <span>{review.country}</span>
                </div>
                <div className="flex items-center mt-1 mb-2 text-yellow-400">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                    ))}
                </div>
                <p className="text-sm text-gray-700 mb-2">{review.content}</p>
                <div className="text-xs text-gray-500 mt-auto">
                  {review.date}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
