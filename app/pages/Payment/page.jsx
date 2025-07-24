"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import React from "react";
import { Motion, spring } from "react-motion";
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

  return (
    <div className="min-h-screen bg-black text-white py-5 pb-20 px-4">
      <Motion
        defaultStyle={{ opacity: 0, y: 50 }}
        style={{
          opacity: spring(1, { stiffness: 120, damping: 17 }),
          y: spring(50, { stiffness: 120, damping: 17 }),
        }}
      >
        {({ opacity, y }) => (
          <div
            style={{
              opacity,
              transform: `translateY(${y}px)`,
            }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <Motion
                defaultStyle={{ scale: 0.8, opacity: 0 }}
                style={{
                  scale: spring(1, { stiffness: 150, damping: 12 }),
                  opacity: spring(1, { stiffness: 150, damping: 12 }),
                }}
              >
                {({ scale, opacity }) => (
                  <h1
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                    }}
                    className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                  >
                    PAYMENT SUMMARY
                  </h1>
                )}
              </Motion>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Secure Payment with Stripe</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Car Details Card */}
              <Motion
                defaultStyle={{ opacity: 0, x: -50, scale: 0.95 }}
                style={{
                  opacity: spring(1, { stiffness: 120, damping: 17 }),
                  x: spring(0, { stiffness: 120, damping: 17 }),
                  scale: spring(1, { stiffness: 120, damping: 17 }),
                }}
              >
                {({ opacity, x, scale }) => (
                  <div
                    style={{
                      opacity,
                      transform: `translateX(${x}px) scale(${scale})`,
                    }}
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

                        <Motion
                          defaultStyle={{ scale: 1 }}
                          style={{
                            scale: spring(1.02, {
                              stiffness: 300,
                              damping: 30,
                            }),
                          }}
                        >
                          {({ scale }) => (
                            <div
                              style={{ transform: `scale(${scale})` }}
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
                            </div>
                          )}
                        </Motion>
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
                            <Motion
                              key={index}
                              defaultStyle={{ opacity: 0, x: -20 }}
                              style={{
                                opacity: spring(1, {
                                  stiffness: 120,
                                  damping: 17,
                                }),
                                x: spring(0, { stiffness: 120, damping: 17 }),
                              }}
                            >
                              {({ opacity, x }) => (
                                <div
                                  style={{
                                    opacity,
                                    transform: `translateX(${x}px)`,
                                  }}
                                  className="flex items-center gap-2 text-sm text-gray-300"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  {feature}
                                </div>
                              )}
                            </Motion>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Motion>

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
                <Motion
                  defaultStyle={{ opacity: 0, x: 50 }}
                  style={{
                    opacity: spring(1, { stiffness: 120, damping: 17 }),
                    x: spring(0, { stiffness: 120, damping: 17 }),
                  }}
                >
                  {({ opacity, x }) => (
                    <div
                      style={{
                        opacity,
                        transform: `translateX(${x}px)`,
                      }}
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
                          <Motion
                            key={index}
                            defaultStyle={{ opacity: 0 }}
                            style={{
                              opacity: spring(1, {
                                stiffness: 120,
                                damping: 17,
                              }),
                            }}
                          >
                            {({ opacity }) => (
                              <div
                                style={{ opacity }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>{text}</span>
                              </div>
                            )}
                          </Motion>
                        ))}
                      </div>
                    </div>
                  )}
                </Motion>
              </div>
            </div>

            {/* Footer Message */}
            <Motion
              defaultStyle={{ opacity: 0, y: 30, scale: 0.9 }}
              style={{
                opacity: spring(1, { stiffness: 120, damping: 17 }),
                y: spring(0, { stiffness: 120, damping: 17 }),
                scale: spring(1, { stiffness: 120, damping: 17 }),
              }}
            >
              {({ opacity, y, scale }) => (
                <div
                  style={{
                    opacity,
                    transform: `translateY(${y}px) scale(${scale})`,
                  }}
                  className="text-center mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600"
                >
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    🚗 Enjoy Your Travel! 🚗
                  </h3>
                  <p className="text-gray-300">
                    All payments are secured with Stripe. Your journey begins
                    with just one click!
                  </p>
                </div>
              )}
            </Motion>
          </div>
        )}
      </Motion>
    </div>
  );
}
