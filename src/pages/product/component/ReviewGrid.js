import React, { useEffect, useState } from "react";
import first from "../../../assest/image/imageone.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ApiHandler } from "../../../helper/ApiHandler";
import Slider from "react-slick";
import ReviewModal from "./ReviewModal"; // Import the modal

const ratingCounts = {
  5: 69,
  4: 6,
  3: 3,
  2: 0,
  1: 0,
};

export default function ReviewGrid() {
  const totalReviews = 78;

  const renderProgress = (count) => {
    const percent = (count / totalReviews) * 100;
    return (
      <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0A2342] rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    );
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedStars, setSelectedStars] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [sortType, setSortType] = useState("date");
  const [page, setPage] = useState(0);
  const perPage = 8;
  const [hasMore, setHasMore] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const increment = 8;

  const fetchReviews = async (currentPage = 0, isAppending = false) => {
    try {
      const payload = {
        page: currentPage,
        perpage: perPage,
        rating: "",
        fromDate: "",
        toDate: "",
      };

      const response = await ApiHandler("/get_rating.php", "POST", payload, undefined, dispatch, navigate);
      const result = await response.data;
      if (result && Array.isArray(result.data)) {
        const formatted = result.data.map((r, idx) => ({
          id: idx + 1 + currentPage * perPage,
          name: r.name,
          email: r.email,
          country: "🇺🇸",
          rating: parseInt(r.rating),
          date: r.created_at?.split(" ")[0] || "",
          content: r.message,
          images: r.image && Array.isArray(r.image) ? r.image : [first], // updated
        }));

        if (isAppending) {
          setReviews((prev) => [...prev, ...formatted]);
        } else {
          setReviews(formatted);
        }

        setHasMore(formatted.length === perPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchReviews(nextPage, true);
    setPage(nextPage);
    setVisibleCount((prev) => prev + increment);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message || selectedStars === 0) return;

    try {
      setLoading(true);
      let uploadedImageNames = [];

      for (const image of selectedImages) {
        const formDataImage = new FormData();
        formDataImage.append("upload_file", image);

        const imageRes = await fetch(
          "https://api.lifevacdevice.com/api/v1/GKdjjhsjhdKdSNd/rest_api/upload.php",
          { method: "POST", body: formDataImage }
        );

        const imageData = await imageRes.json();
        if (imageData?.data) {
          uploadedImageNames.push(imageData.data);
        }
      }

      const reviewData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        rating: selectedStars,
        image: uploadedImageNames,
      };

      await ApiHandler("/rating.php", "POST", reviewData, undefined, dispatch, navigate);

      setFormData({ name: "", email: "", message: "" });
      setSelectedStars(5);
      setHoveredStar(0);
      setSelectedImages([]);
      setShowForm(false);

      await fetchReviews(); // Refresh after submit
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortType) {
      case "rate":
        return b.rating - a.rating;
      case "content":
        return a.content.localeCompare(b.content);
      case "content-desc":
        return b.content.localeCompare(a.content);
      case "date":
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <>
      <section className="p-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10 mb-4 p-4 bg-white rounded-md">
            {/* Rating Summary */}
            <div className="flex flex-col gap-6 w-full md:w-4/5">
              {/* Left: Rating Box */}
              <div className="flex items-center gap-6">
                <div className="bg-[#162950] text-white p-4 rounded-md w-20 h-20 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="text-xs">out of 5</span>
                </div>
                <p className="text-sm text-[#162950] pt-1">
                  Based on {totalReviews} reviews
                </p>
              </div>

              {/* Middle: Stars Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <div className="text-[#162950] min-w-[60px]">
                      {"★".repeat(star)}
                      {"☆".repeat(5 - star)}
                    </div>
                    {renderProgress(ratingCounts[star])}
                    <div className="w-6 text-right text-[#162950] font-medium ">
                      ({ratingCounts[star]})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="w-full md:w-1/5 flex justify-start md:justify-end">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-[#162950] text-white px-4 py-2 w-full md:w-auto rounded text-sm"
              >
                {showForm ? "Close Form" : "Write a Review"}
              </button>
            </div>
          </div>

          {/* Form */}
          {showForm && (
            <div className="border-t border-gray-300 pt-6 mb-8">
              <h3 className="text-center text-lg font-semibold text-[#162950] mb-2">
                Write a Review
              </h3>
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
                <label className="cursor-pointer flex items-center justify-center gap-1 mx-auto">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm3 3v4l4-2-4-2z" />
                  </svg>
                  <span>Add photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                {selectedImages.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 border rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0 right-0 bg-white text-red-500 rounded-full px-1 text-xs hover:bg-red-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-[#162950] text-white px-6 py-2 rounded text-sm"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit review"}
                </button>
              </div>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex justify-end mb-4">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border px-3 py-2 rounded text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="rate">Sort by Rating</option>
              <option value="content">Sort by Content (A–Z)</option>
              <option value="content-desc">Sort by Content (Z–A)</option>
            </select>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedReviews.slice(0, visibleCount).map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className="cursor-pointer border rounded-xl shadow-sm overflow-hidden"
              >
                {review.images.length > 1 ? (
                  <div className="">
                    <Slider {...sliderSettings}>
                      {review.images.map((imgSrc, index) => (
                        <div key={index}>
                          <img
                            src={`https://airwayclear.ffnewsupdater.xyz/assets/${imgSrc}`}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-40 object-cover rounded"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <img
                    src={`https://airwayclear.ffnewsupdater.xyz/assets/${review?.images[0]}`}
                    alt="Review"
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <div className="p-4">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm font-bold">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                  <p className="text-sm mt-2">{review.content}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedReview && (
        <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </>
  );
}
