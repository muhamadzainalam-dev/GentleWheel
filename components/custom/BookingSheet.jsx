"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Car, Calendar, CreditCard, User, Phone, Mail } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setListing } from "@/store/listingsSlice";
import { setFormdata } from "@/store/formdataSlice";

export default function BookingSheet({ car, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    totalDays: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };

      const { startDate, endDate } = updatedFormData;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        updatedFormData.totalDays = days > 0 ? days : 1;
      }

      setFormData(updatedFormData);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateTotal = () => {
    return car?.discountedPrice * formData.totalDays;
  };

  const handleSubmitBooking = () => {
    dispatch(
      setListing({
        name: car.name,
        amount: car.discountedPrice,
        image: car.image,
        duration: formData.totalDays,
      })
    );
    dispatch(
      setFormdata({
        userinfo: {
          username: formData.name,
          useremail: formData.email,
          phone: formData.phone,
        },
        vehicleinfo: {
          name: car.name,
          model: car.model,
          price: car.discountedPrice,
        },
        bookingdata: {
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalDays: formData.totalDays,
          totalprice: car.discountedPrice * formData.totalDays,
        },
      })
    );
    router.push("/pages/Payment");
  };

  if (!car) return null;
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Sliding Sheet */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-gradient-to-r from-black to-gray-900 border-l border-gray-800 z-50 overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Booking Details</h2>
              <p className="text-gray-400 mt-1">
                Reserve the {car.name} - {car.model}
              </p>
            </div>
            <motion.button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Car Info */}
          <div className="flex-1 p-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center mb-3">
                <Car className="text-green-400 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-white">
                  Vehicle Info
                </h3>
              </div>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{car.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span>{car.model}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span>{car.year}</span>
                </div>
                <div className="flex justify-between font-bold text-green-400">
                  <span>Price per day:</span>
                  <span>$ {car.discountedPrice}</span>
                </div>
              </div>
            </motion.div>
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Your Info
              </h3>

              {[
                { label: "Full Name", name: "name", icon: User, type: "text" },
                {
                  label: "Email Address",
                  name: "email",
                  icon: Mail,
                  type: "email",
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  icon: Phone,
                  type: "tel",
                },
              ].map(({ label, name, icon: Icon, type }) => (
                <div key={name}>
                  <label className="block text-sm text-gray-400 mb-2">
                    <Icon className="inline mr-1" size={16} /> {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <Calendar className="inline mr-1" size={16} /> Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  />
                </div>
              </div>
            </motion.div>
            {/* Price Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center mb-3">
                <CreditCard className="text-green-400 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-white">
                  Price Summary
                </h3>
              </div>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span>$ {car.discountedPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formData.totalDays} day(s)</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold text-white">
                  <span>Total:</span>
                  <span className="text-green-400">$ {calculateTotal()}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 bg-gray-800/50">
            <div className="flex space-x-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium cursor-pointer"
              >
                <SignedOut>
                  <SignUpButton>Sign Up or Log In to Continue</SignUpButton>
                </SignedOut>
                <SignedIn>
                  <button onClick={handleSubmitBooking}>Confirm Booking</button>
                </SignedIn>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium border border-gray-600"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
