"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="bg-black text-white py-12">
      <div className="text-center mb-10">
        <h6 className="text-green-500 font-semibold text-5xl">Contact Us</h6>
        <h2 className="text-6xl font-bold mt-2">We’d love to hear from you</h2>
        <p className="text-gray-300 text-lg mt-1">
          Our team is always here to answer your queries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/30  p-8 rounded-lg text-white"
        >
          <div className="bg-green-500 w-fit p-3 rounded mb-4">
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.5l-10 6.25L2 5.5V4zm0 3.94v10.06a2 2 0 002 2h16a2 2 0 002-2V7.94l-10 6.25L2 7.94z" />
            </svg>
          </div>
          <h4 className="font-semibold text-lg mb-1">Email Us</h4>
          <p className="text-sm text-gray-300 mb-1">We're here to help</p>
          <p className="text-sm text-green-500">xxxxx@xxxxx</p>
        </motion.div>

        {/* We Care */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/30  p-8 rounded-lg text-white"
        >
          <div className="bg-green-500 w-fit p-3 rounded mb-4">
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h4 className="font-semibold text-lg mb-1">We Care</h4>
          <p className="text-sm text-gray-300">
            We truly care about your experience
          </p>
          <p className="text-sm text-green-500">
            Let us know what you have to say
          </p>
        </motion.div>

        {/* Visit Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 3 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/30  p-8 rounded-lg text-white"
        >
          <div className="bg-green-500 w-fit p-3 rounded mb-4">
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
          </div>
          <h4 className="font-semibold text-lg mb-1">Visit us</h4>
          <p className="text-sm text-gray-300">xxxxx</p>
          
        </motion.div>

        {/* Call Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 4 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/30  p-8 rounded-lg text-white"
        >
          <div className="bg-green-500 w-fit p-3 rounded mb-4">
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.72 11.72 0 003.64.58 1 1 0 011 1V20a1 1 0 01-1 1C10.2 21 3 13.8 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.2 2.5.58 3.64a1 1 0 01-.21 1.11l-2.25 2.25z" />
            </svg>
          </div>
          <h4 className="font-semibold text-lg mb-1">Call us</h4>
          <p className="text-sm text-gray-300">We're here for you 24/7</p>
          <p className="text-sm text-green-500">
            <span className="text-white">National Customers:</span> xxx-xxxxx
          </p>
        </motion.div>
      </div>
    </section>
  );
}
