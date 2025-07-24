"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuLoaderPinwheel } from "react-icons/lu";

/**
 * CarGrid - displays a responsive grid of cars
 * @param {Array} cars - car data array
 * @param {Function} onBook - callback when "Book Now" is clicked
 */
const CarGrid = ({ cars = [], onBook }) => {
  return (
    <div>
      {cars.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car, idx) => (
            <motion.div
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.95 }}
              key={`${car.name}-${idx}`}
              className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-white mb-1">
                {car.name}
              </h2>
              <p className="text-white/70 text-sm mb-2">
                {car.model} • {car.year}
              </p>
              <div className="text-green-400 font-bold text-lg mb-2 space-x-3">
                <span className="space-x-1">
                  <span className="text-gray-400 text-normal text-decoration: line-through">$ {car.price}</span>
                  <span className="text-sm text-white/50 font-normal">
                    / day
                  </span>
                </span>
                <span className="space-x-1">
                  <span>$ {car.discountedPrice}</span>
                  <span className="text-sm text-white/50 font-normal">
                    / day
                  </span>
                </span>
              </div>
              <button
                onClick={() => onBook(car)}
                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex h-[75vh] w-full items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "center center", // ensures rotation around center
            }}
          >
            <div className="w-20 h-20 text-white flex items-center justify-center">
              <LuLoaderPinwheel className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CarGrid;
