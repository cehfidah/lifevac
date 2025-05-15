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
      "Had bought and kept this for a couple of months not knowing when it would come of value but today it helped in extracting a foreign object from an 8-month-old baby. Worked marvelously.",
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
  const [selectedStars, setSelectedStars] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortType, setSortType] = useState("date");
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to hold uploaded image filename

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      selectedStars === 0
    ) {
      return;
    }

    try {
      setLoading(true);

      // Step 1: If there is an image, upload it first
      if (selectedImage) {
        const formDataImage = new FormData();
        formDataImage.append("upload_file", selectedImage);

        const imageResponse = await fetch(
          "https://airwayclear.ffnewsupdater.xyz/api/v1/GKdjjhsjhdKdSNd/rest_api/upload.php",
          {
            method: "POST",
            body: formDataImage,
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Failed to upload the image.");
        }

        const imageData = await imageResponse.json();

        // Set the uploaded image filename to pass it to the review API
        setUploadedImage(imageData.data);
      }

      const reviewData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        rating: selectedStars,
        image: uploadedImage, // Add the uploaded image filename here
      };
      // Step 2: Submit the review with the image filename (if uploaded)
      const reviewResponse = await fetch(
        "https://airwayclear.ffnewsupdater.xyz/api/v1/GKdjjhsjhdKdSNd/rest_api/rating.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      if (!reviewResponse.ok) {
        throw new Error("Failed to submit the review.");
      }

      const data = await reviewResponse.json();
      console.log("Review Submitted:", data);

      setShowForm(false);
      setFormData({ name: "", email: "", message: "" });
      setSelectedStars(0);
      setHoveredStar(0);
      setSelectedImage(null);
      setUploadedImage(null); // Reset image state after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
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
                      className={`w-4 h-4 ${i < stars ? "text-gray-400" : "text-gray-200"
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
                  className={`w-6 h-6 cursor-pointer ${star <= (hoveredStar || selectedStars)
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
              name="message"
              value={formData.message}
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
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit review"}
              </button>
            </div>
          </div>
        )}

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...reviews]
            .sort((a, b) => {
              switch (sortType) {
                case "date":
                  return new Date(b.date) - new Date(a.date);
                case "rate":
                  return b.rating - a.rating;
                default:
                  return 0;
              }
            })
            .map((review) => (
              <div
                key={review.id}
                className="border p-4 rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {review.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.country}
                    </div>
                    <div className="text-xs text-gray-400">{review.date}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating
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
                <p className="text-sm text-gray-600">{review.content}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
