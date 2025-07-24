"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample slide data - you can replace with your actual content
  const slides = [
    {
      id: 1,
      title: "BMW i7",
      description: "Experience ultimate luxury and innovation in every drive.",
      image:
        "https://www.mad4wheels.com/img/free-car-images/mobile/19564/bmw-i7-g70-xdrive60-2023-695166.jpg",
      price: "₹12,000/day",
    },
    {
      id: 2,
      title: "Mercedes-Benz GLB-Class",
      description: "Perfect for family trips with style and comfort.",
      image:
        "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/glb-class/class-page/series/2025-GLB-SUV-CH-1-1-DR.jpg",
      price: "9,500/day",
    },
    {
      id: 3,
      title: "Audi A8",
      description: "Luxury redefined for business and elite travel.",
      image:
        "https://media.audi.com/is/image/audi/nemo/models/a8/a8-l/my-2022-pa/nemo-derivate-startpage/stage/A8_2021_3275_V1_withoutCast-xl.jpg?width=1440",
      price: "11,000/day",
    },
    {
      id: 4,
      title: "Porsche Panamera",
      description: "Unleash performance and elegance on the open road.",
      image:
        "https://images-porsche.imgix.net/-/media/EF493E3F2EFA4639AD7DC8100544D4E6_317C931650634732AB704E99B3BC39E9_PA24P5DOX0001-panamera-rear?w=600&q=85&crop=faces%2Centropy%2Cedges&auto=format",
      price: "15,000/day",
    },
    {
      id: 5,
      title: "2025 Audi Q7",
      description: "Powerful and refined SUV for long journeys.",
      image:
        "https://nar.media.audi.com/is/image/audinar/nemo/us/models/Q7/Q7/MY25/1920x1920_Crop2_MY25---Q7---Front-Profile---Parked---5390.jpg?width=1024",
      price: "10,500/day",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Left Section - Text Content (50%) */}
          <div className="w-1/2 pr-12">
            <div className="space-y-6 ">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                Your Journey Begins With the{" "}
                <span className="text-green-500">Perfect Ride</span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 max-w-lg">
                Starting At{" "}
                <span className="text-green-500">
                  100<span className="ml-1">$</span>
                </span>{" "}
                Only
              </p>
              <div className="flex space-x-4 mt-8">
                <button className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  <Link href={"/pages/Listings"}>Book Now</Link>
                </button>
                <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  <Link href={"#about"}>Learn More</Link>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Animated Slider (50%) */}
          <div className="w-1/2 pl-12">
            <div
              className="relative max-w-md mx-auto"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Main Slider Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="w-full flex-shrink-0 relative group"
                    >
                      {/* Slide Image */}
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>

                      {/* Slide Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-2">
                          {slide.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-green-500">
                            {slide.price}
                          </span>
                          <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                            <Link href={"/pages/Listings"}>Book Now</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-green-400 w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
