"use client";
import React, { useState, useEffect } from "react";
import { Car, CheckCircle, Clock, Users, BarChart3, Flag } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("ALL_LISTINGS");
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [boookingId, setBoookingId] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    model: "",
    image: "",
    price: "",
    discountedPrice: "",
    transmission: "",
    ac: "",
    seats: "",
    doors: "",
    luxuryLevel: "",
    rating: "",
    popularity: "",
    fuelType: "",
    year: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteCar = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`/api/Listings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete failed");

      setListings((prev) => prev.filter((car) => car._id !== id));
      // alert("✅ Car deleted successfully.");
    } catch (error) {
      alert("❌ Delete failed: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Convert number fields
    const payload = {
      ...form,
      price: Number(form.price),
      discountedPrice: Number(form.discountedPrice),
      rating: Number(form.rating),
      popularity: Number(form.popularity),
      year: Number(form.year),
      ac: form.ac === "true",
      seats: Number(form.seats),
      doors: Number(form.doors),
    };

    try {
      const res = await fetch("/api/Listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setMessage("✅ Car listing added!");
      alert("✅ Car listing added!");
      setForm({
        name: "",
        model: "",
        image: "",
        price: "",
        discountedPrice: "",
        transmission: "",
        ac: "",
        seats: "",
        doors: "",
        luxuryLevel: "",
        rating: "",
        popularity: "",
        fuelType: "",
        year: "",
      });
      setOpen(false);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const listingsRes = await fetch("/api/Listings");
        const listingsData = await listingsRes.json();

        const bookingsRes = await fetch("/api/Booking_Save");
        const bookingsData = await bookingsRes.json();

        setListings(listingsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: "ALL_LISTINGS", label: "ALL LISTINGS", icon: Car },
    { id: "PENDING_BOOKINGS", label: "PENDING BOOKINGS", icon: Clock },
    { id: "APPROVED_BOOKINGS", label: "APPROVED BOOKINGS", icon: CheckCircle },
    { id: "COMPLETED_BOOKINGS", label: "COMPLETED BOOKINGS", icon: BarChart3 },
  ];

  const getFilteredBookings = () => {
    switch (activeTab) {
      case "PENDING_BOOKINGS":
        return bookings.filter(
          (booking) => booking.bookingDetails.status === "pending"
        );
      case "APPROVED_BOOKINGS":
        return bookings.filter(
          (booking) => booking.bookingDetails.status === "approved"
        );
      case "COMPLETED_BOOKINGS":
        return bookings.filter(
          (booking) => booking.bookingDetails.status === "completed"
        );
      default:
        return bookings;
    }
  };

  const handlestatuschage = async (bookingId, newStatus) => {
    if (!bookingId || !newStatus) {
      setResponseMessage("Booking ID and status are required.");
      return;
    }

    try {
      const res = await fetch("/api/Booking_Save", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage("✅ Status updated successfully");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId
              ? {
                  ...b,
                  bookingDetails: {
                    ...b.bookingDetails,
                    status: newStatus,
                  },
                }
              : b
          )
        );
      } else {
        setResponseMessage(`❌ ${data.error || "Update failed"}`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      setResponseMessage("❌ Network error");
    }
  };

  const handlestatusapproved = async (bookingId, newStatus) => {
    if (!bookingId || !newStatus) {
      setResponseMessage("Booking ID and status are required.");
      return;
    }

    try {
      const res = await fetch("/api/Booking_Save", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage("✅ Status updated successfully");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId
              ? {
                  ...b,
                  bookingDetails: {
                    ...b.bookingDetails,
                    status: newStatus,
                  },
                }
              : b
          )
        );
      } else {
        setResponseMessage(`❌ ${data.error || "Update failed"}`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      setResponseMessage("❌ Network error");
    }
  };

  const buttonstatus = () => {
    switch (activeTab) {
      case "PENDING_BOOKINGS":
        return (
          <button
            className="bg-green-500 px-3 py-1 rounded text-sm"
            onClick={() => handlestatuschage(boookingId, "approved")}
          >
            APPROVE
          </button>
        );
      case "APPROVED_BOOKINGS":
        return (
          <button
            className="bg-green-500 px-3 py-1 rounded text-sm"
            onClick={() => handlestatusapproved(boookingId, "completed")}
          >
            COMPLETED
          </button>
        );
      case "COMPLETED_BOOKINGS":
        return <span className="text-gray-30 text-sm">DONE</span>;
    }
  };

  const loginUser = (e) => {
    e.preventDefault();

    const validUser = "admin";
    const validPass = "admin123";

    if (user === validUser && pass === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      setLoggedIn(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Wrong username or password");
    }
  };

  return (
    <>
      {loggedIn == false ? (
        <div>
          <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-xl w-[90vw] max-w-[440px] p-7"
            >
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-2xl text-green-500 font-bold">
                  Welcome back
                </h1>
                <p className="text-sm text-gray-300">Login to continue</p>
              </div>
              <form onSubmit={loginUser} className="space-y-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />

                {errorMsg && (
                  <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-green-700 text-white rounded font-semibold hover:bg-green-600 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      ) : (
        <div>
          <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-green-400 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <Car className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">Car Rental Admin</h1>
                      <p className="text-green-400">
                        Manage your fleet and bookings
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-500 px-4 py-2 rounded-lg">
                    <Users className="w-5 h-5 inline mr-2" />
                    <span className="font-semibold">
                      {
                        bookings.filter(
                          (booking) =>
                            booking.bookingDetails.status === "pending"
                        ).length
                      }{" "}
                      Pending Bookings
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-800 border-b border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 py-4">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-green-500 text-white shadow-lg transform scale-105"
                            : "text-gray-300 hover:text-green-400 hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {activeTab === "ALL_LISTINGS" ? (
                <div>
                  <div className="flex items-center justify-between py-8">
                    <h2 className="text-2xl font-bold text-green-400 mb-4">
                      All Car Listings
                    </h2>
                    <button
                      className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="text-2xl">+</span> Add Car
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((car) => (
                      <div
                        key={car._id}
                        className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-all"
                      >
                        <div className="relative">
                          <img
                            src={car.image}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">
                            {car.name}{" "}
                            <span className="text-gray-400 text-sm font-normal">
                              {car.model}
                            </span>
                          </h3>
                          <div className="flex justify-between items-center mb-4 text-gray-300">
                            <span>{car.year}</span>
                            <span className="text-decoration: line-through text-gray-400 font-bold">
                              ${car.price}/day
                            </span>
                            <span className="text-green-400 font-bold">
                              ${car.discountedPrice}/day
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteCar(car._id)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                          >
                            Delete Car
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-green-400 mb-4">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h2>
                  <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm text-green-400 uppercase">
                              Customer
                            </th>
                            <th className="px-6 py-4 text-left text-sm text-green-400 uppercase">
                              Contact Info
                            </th>
                            <th className="px-6 py-4 text-left text-sm text-green-400 uppercase">
                              Duration
                            </th>
                            <th className="px-6 py-4 text-left text-sm text-green-400 uppercase">
                              Start Date
                            </th>
                            <th className="px-6 py-4 text-left text-sm text-green-400 uppercase">
                              Amount
                            </th>
                            <th className="px-6 py-4 text-left text-sm text-green-400 uppercase">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {getFilteredBookings().map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-700">
                              <td className="px-6 py-4">
                                {booking.userInfo.name}
                              </td>
                              <td className="px-6 py-4">
                                {booking.userInfo.email}
                                <br />
                                <span className="text-green-400">
                                  {booking.userInfo.phone}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {booking.bookingDetails.price /
                                  booking.vehicleInfo.pricePerDay}
                              </td>
                              <td className="px-6 py-4">
                                {booking.bookingDetails.startDate}
                              </td>
                              <td className="px-6 py-4 text-green-400 font-semibold">
                                ${booking.bookingDetails.price}
                              </td>
                              <td
                                className="px-6 py-4"
                                onClick={() => setBoookingId(booking._id)}
                              >
                                {buttonstatus()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {responseMessage && (
                    <div className="mt-4 text-center text-sm font-semibold text-green-400">
                      {responseMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="min-h-screen flex text-white bg-gradient-to-r from-black to-gray-900 text-white border-l border-gray-800 py-6 shadow-xl overflow-y-auto min-w-[50%]">
            <SheetHeader className="border-b border-gray-800 px-8 pb-2.5">
              <SheetTitle className="text-2xl font-bold text-white">
                Add New Car
              </SheetTitle>
              <SheetDescription className="text-gray-400">
                Fill in the car listing details.
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSubmit} className="px-8 mt-6 ">
              <div className="space-y-3 pb-10 grid grid-cols-2 gap-5">
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Model", name: "model", type: "text" },
                  { label: "Image URL", name: "image", type: "text" },
                  { label: "Price ($)", name: "price", type: "number" },
                  {
                    label: "Discounted Price ($)",
                    name: "discountedPrice",
                    type: "number",
                  },
                  { label: "Rating", name: "rating", type: "number" },
                  { label: "Popularity", name: "popularity", type: "number" },
                  { label: "Year", name: "year", type: "number" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-300">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required
                      className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none "
                    />
                  </div>
                ))}

                {/* Select dropdowns */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={form.transmission}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 "
                  >
                    <option value="">Select transmission</option>
                    <option value="AUTO">Auto</option>
                    <option value="NONE">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    AC
                  </label>
                  <select
                    name="ac"
                    value={form.ac}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">AC available?</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Seats
                  </label>
                  <select
                    name="seats"
                    value={form.seats}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select seats</option>
                    {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Doors
                  </label>
                  <select
                    name="doors"
                    value={form.doors}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select doors</option>
                    {[2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Luxury Level
                  </label>
                  <select
                    name="luxuryLevel"
                    value={form.luxuryLevel}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select luxury level</option>
                    {[
                      "basic",
                      "mid-range",
                      "luxury",
                      "supercar",
                      "ultra-luxury",
                      "hypercar",
                    ].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div>
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-500 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
                >
                  {loading ? "Adding..." : "Add Car Listing"}
                </button>
              </div>
              {message && (
                <p className="text-sm text-center mt-2 text-green-400">
                  {message}
                </p>
              )}
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
