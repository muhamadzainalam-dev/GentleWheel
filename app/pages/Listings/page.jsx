"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/custom/NavBar";
import CarGrid from "@/components/custom/CarGrid";
import BookingSheet from "@/components/custom/BookingSheet";
import FilterBar from "@/components/custom/FilterBar";
import { motion, AnimatePresence } from "framer-motion";
import { BsFire } from "react-icons/bs";

export default function Page() {
  const [carData, setCarData] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [activeSortType, setActiveSortType] = useState("default");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCarListings = async () => {
      try {
        const res = await fetch("/api/FetchData");
        const data = await res.json();
        setCarData(data);
        setSortedCars(data);

        console.log("Data Fetched");
      } catch (error) {
        console.error("Failed to fetch car listings", error);
      }
    };
    fetchCarListings();
  }, []);

  // Sorting handler
  const sortCars = (type) => {
    let sorted = [...carData];
    switch (type) {
      case "price-low":
        sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "luxury-basic":
        sorted = sorted.filter((car) => car.luxuryLevel === "basic");
        break;
      case "luxury-standard":
        sorted = sorted.filter((car) => car.luxuryLevel === "standard");
        break;
      case "luxury-premium":
        sorted = sorted.filter((car) =>
          ["premium", "luxury"].includes(car.luxuryLevel),
        );
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "newest":
        sorted.sort((a, b) => b.year - a.year);
        break;
      default:
        sorted = carData;
    }
    setSortedCars(sorted);
    setActiveSortType(type);
  };

  return (
    <div>
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mt-20 mb-10 space-y-1">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cars For Rent
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-12 h-12 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <BsFire />
              </div>
            </motion.div>
          </motion.h1>
          <p className="text-gray-400">Discover All Avalible Cars</p>
        </div>

        <FilterBar onSort={sortCars} />

        {activeSortType !== "default" && (
          <p className="text-green-400 text-sm mb-4">
            Showing:{" "}
            <span className="font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
              {activeSortType.replace("-", " ").toUpperCase()}
            </span>{" "}
            <span className="text-white/60 ml-2">
              ({sortedCars.length} cars)
            </span>
          </p>
        )}

        {/* Car Cards Grid */}
        <CarGrid
          cars={sortedCars}
          onBook={(car) => {
            setSelectedCar(car);
            setSheetOpen(true);
          }}
        />
      </main>

      {/* Booking Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <BookingSheet car={selectedCar} onClose={() => setSheetOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
