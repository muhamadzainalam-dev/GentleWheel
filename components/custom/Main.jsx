"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Snowflake, Settings } from "lucide-react";
import { BsFire } from "react-icons/bs";
import Link from "next/link";

const carData = [
  {
    name: "Toyota Corolla",
    model: "GLi 1.3 VVTi",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    price: 8100,
    discountedPrice: 6499,
    transmission: "Auto",
    ac: true,
    seats: 4,
    doors: 4,
  },
  {
    name: "Honda City",
    model: "1.3 i-VTEC Prosmatec",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    price: 8100,
    discountedPrice: 6499,
    transmission: "Auto",
    ac: true,
    seats: 4,
    doors: 4,
  },
  {
    name: "Suzuki Swift",
    model: "DLX 1.3",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    price: 7800,
    discountedPrice: 6299,
    transmission: "Manual",
    ac: true,
    seats: 4,
    doors: 4,
  },
  {
    name: "Kia Sportage",
    model: "FWD 2.0",
    image:
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    price: 12000,
    discountedPrice: 9999,
    transmission: "Auto",
    ac: true,
    seats: 5,
    doors: 4,
  },
  {
    name: "Hyundai Elantra",
    model: "GLS 1.6",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    price: 10500,
    discountedPrice: 8999,
    transmission: "Auto",
    ac: true,
    seats: 5,
    doors: 4,
  },
];

export default function Main() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const FireIcon = () => (
    <div
      className="w-12 h-12 text-green-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <BsFire />
    </div>
  );

  return (
    <div className="p-8 space-y-8 mx-auto w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white flex items-center justify-center gap-4 mb-4"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hot Right Now
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
            <FireIcon />
          </motion.div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/70 text-lg"
        >
          Discover the most popular car rentals available now
        </motion.p>
      </motion.div>

      {/* Car Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-6"
      >
        {carData.map((car, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.3 },
            }}
            className="group relative"
          >
            {/* Card Container */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-500 overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-8 relative z-10">
                {/* Car Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                  className="flex-shrink-0"
                >
                  <div className="relative group/image">
                    <motion.img
                      src={car.image}
                      alt={car.name}
                      className="w-48 h-28 object-cover rounded-xl shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                </motion.div>

                {/* Car Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="flex-1 flex flex-col gap-2"
                >
                  <h2 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    {car.name}
                  </h2>
                  <p className="text-sm text-white/60">{car.model}</p>

                  {/* Features */}
                  <div className="flex gap-8 text-sm text-green-500 mt-2">
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Users className="w-4 h-4" />
                      <span>{car.seats}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Settings className="w-4 h-4" />
                      <span>{car.transmission}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Snowflake className="w-4 h-4" />
                      <span>AC</span>
                    </motion.div>
                  </div>

                  {/* Perks */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    className="flex flex-wrap gap-2 mt-3 text-xs"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="text-green-400 font-semibold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20"
                    >
                      Earn upto 50🪙
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800/50 text-white/80 px-3 py-1 rounded-full border border-gray-800"
                    >
                      Theft Protection
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800/50 text-white/80 px-3 py-1 rounded-full border border-gray-800"
                    >
                      Clean Interior/Exterior
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Pricing & Book */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="text-right"
                >
                  <p className="text-white/40 text-sm line-through">
                    $ {car.price}
                  </p>
                  <p className="text-lg font-bold text-green-500">
                    $ {car.discountedPrice}{" "}
                    <span className="text-sm font-medium text-white/60">
                      / 1 day(s)
                    </span>
                  </p>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg"
                  >
                    Bookme
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-center mt-12"
      >
        <Link href={"/pages/Listings"}>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="text-xl px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            View All Cars
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
