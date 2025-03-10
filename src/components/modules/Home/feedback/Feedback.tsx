"use client";

import React, { useEffect, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { getAllFeedbacks } from "@/services/authService";

// Define the Feedback type
interface FeedbackType {
  _id: string;
  name: string;
  feedbackUserPhoto?: string;
  lifeStyle: string;
  feedBack: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const res = await getAllFeedbacks();
        setFeedbacks(res?.data || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    getFeedbacks();
  }, []);

  return (
    <div className="my-[100px] lg:w-[90%] mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Feedback</h1>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        virtual
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback._id}>
            <div className="flex flex-col items-center justify-evenly w-full h-[350px] p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white">
              <Image
                src={feedback.feedbackUserPhoto || "/default-user.jpg"} // Fallback image
                alt={`${feedback.name}'s photo`}
                className="w-[80px] h-[80px] rounded-full shadow-md object-cover"
                width={80}
                height={80}
              />
              <h2 className="text-xl font-semibold text-gray-700 text-center">{feedback.name}</h2>
              <p className="text-sm text-blue-600 italic text-center">{feedback.lifeStyle}</p>
              <p className="text-gray-600 text-center">{feedback.feedBack}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
