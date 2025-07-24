"use client";
import React, { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image:
        "data:image/jpeg;base64,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",
      content:
        "Renting a luxury car for our corporate event was effortless. The vehicle was spotless, on time, and made a great impression. We'll definitely use this service again.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      image:
        "data:image/jpeg;base64,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",
      content:
        "I booked a car last minute for a weekend getaway — the entire process was seamless. Super easy online booking, great prices, and the car was in perfect condition.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image:
        "data:image/jpeg;base64,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",
      content:
        "Absolutely loved the ride! The vehicle was well-maintained, the pick-up was smooth, and their support team was quick to respond to questions.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Thompson",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUkbSs9JZPtEYqdlLVUTtGl7Qw0FgL4oYG9Q&s",
      content:
        "I’ve used several car rental services, but this one stands out. Reliable, affordable, and the car selection is top-notch. Perfect for business travel.",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Wang",
      image:
        "data:image/jpeg;base64,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",
      content:
        "Fantastic experience! We rented an SUV for a family trip — the process was quick, the car was clean, and everything went smoothly. Highly recommend!",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsVisible(true);
    }, 300);
  };

  const prevTestimonial = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsVisible(true);
    }, 300);
  };

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsVisible(true);
      }, 300);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? "text-green-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-green-500 mb-12 text-center">
        What Our Clients Say
      </h1>

      <div className="relative">
        {/* Main Testimonial */}
        <div className=" rounded-lg  p-8 mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/30 shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-600/30">
          <div
            className={`transition-all duration-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-400"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3">
                  {renderStars(currentTestimonial.rating)}
                </div>

                <blockquote className="text-lg mb-4 italic">
                  "{currentTestimonial.content}"
                </blockquote>

                <div>
                  <h4 className="font-semibold text-lg">
                    {currentTestimonial.name}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-green-500 scale-125"
                    : "bg-gray-300 hover:bg-green-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                index === currentIndex
                  ? "border-green-500 bg-green-600 shadow-md"
                  : "bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-600/30"
              }`}
            >
              <div className="text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className={`w-12 h-12 rounded-full object-cover mx-auto mb-2 transition-all duration-300 ${
                    index === currentIndex ? "ring-2 ring-green-500" : ""
                  }`}
                />
                <h5 className="font-medium text-white text-sm truncate">
                  {testimonial.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
