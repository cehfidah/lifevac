import React from "react";
import Slider from "react-slick";

const ReviewModal = ({ review, onClose }) => {
    if (!review) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-auto mt-8 mb-8 overflow-y-auto overflow-x-hidden max-h-[90vh] shadow-lg">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button onClick={onClose} className="text-gray-600 hover:text-black text-xl font-bold">&times;</button>
                </div>

                {/* Modal Content */}
                <div className="px-6 pb-6">
                    {review.images.length > 1 ? (
                        <div className="">
                            <Slider {...settings}>
                                {review.images.map((imgSrc, index) => (
                                    <div key={index}>
                                        <img
                                            src={`https://api.lifevacdevice.com/assets/${imgSrc}`}
                                            alt={`Review image ${index + 1}`}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <img
                            src={`https://api.lifevacdevice.com/assets/${review?.images[0]}`}
                            alt="Review"
                            className="w-full h-64 object-cover"
                        />
                    )}

                    {/* Review Info */}
                    <div className="mb-2 font-bold text-lg">{review.name}</div>
                    <div className="text-sm text-gray-500 mb-2">{review.date}</div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                            </svg>
                        ))}
                    </div>

                    <p className="text-gray-700 text-sm">{review.content}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
