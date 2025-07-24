"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import React from "react";
import { motion } from "framer-motion"; // ✅ Use lowercase 'motion'
import {
  Shield,
  CheckCircle,
  Car,
  Calendar,
  DollarSign,
  Star,
} from "lucide-react";
import CheckoutPage from "@/components/custom/CheckoutPage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const item = useSelector((state) => state.listings.item);

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-gray-400">No payment details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-5 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 17 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
        >
          PAYMENT SUMMARY
        </motion.h1>

        <div className="flex items-center justify-center gap-2 text-gray-300 mb-12">
          <Shield className="w-5 h-5 text-green-400" />
          <span>Secure Payment with Stripe</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Car Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 17 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500 p-3 rounded-xl">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Rental Details
                </h2>
              </div>

              <div className="object-cover overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black rounded-xl border border-gray-600">
                  <span className="text-gray-300">Vehicle</span>
                  <span className="font-bold text-white text-lg">
                    {item.name}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black rounded-xl border border-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Duration</span>
                  </div>
                  <span className="font-semibold text-white">
                    {item.duration}
                  </span>
                </div>

                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">
                      Total Amount
                    </span>
                  </div>
                  <span className="font-bold text-white text-2xl">
                    ${item.amount * item.duration}
                  </span>
                </motion.div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-400" />
                  Included Features
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Luxury Interior",
                    "GPS Navigation",
                    "Bluetooth",
                    "Premium Audio",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 17,
                        delay: index * 0.1,
                      }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Card */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl">
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: item.amount * item.duration,
                  currency: "usd",
                }}
              >
                <CheckoutPage amount={item.amount * item.duration} />
              </Elements>
            </div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 17 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Security & Trust
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                {[
                  "256-bit SSL encryption",
                  "PCI DSS compliant",
                  "Your data is protected",
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 17,
                      delay: index * 0.15,
                    }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 17 }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-2">
            🚗 Enjoy Your Travel! 🚗
          </h3>
          <p className="text-gray-300">
            All payments are secured with Stripe. Your journey begins with just
            one click!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
