"use client";
import { useEffect, useState } from "react";

const tabs = [
  "ALL LISTINGS",
  "PENDING BOOKINGS",
  "APPROVED BOOKINGS",
  "COMPLETED BOOKINGS",
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("ALL LISTINGS");
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/Listings")
      .then((res) => res.json())
      .then(setListings)
      .catch(console.error);

    fetch("/api/Bookings_Save")
      .then((res) => res.json())
      .then(setBookings)
      .catch(console.error);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "PENDING BOOKINGS") return booking.status === "pending";
    if (activeTab === "APPROVED BOOKINGS") return booking.status === "approved";
    if (activeTab === "COMPLETED BOOKINGS")
      return booking.status === "completed";
    return true;
  });

  return (
    <div>
      <div>
        {activeTab === "ALL LISTINGS" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((car) => (
              <div key={car._id} className="bg-black p-4 rounded-xl shadow-lg">
                <h2 className="text-green-500 text-xl font-semibold">
                  {car.name}
                </h2>
                <p className="text-gray-300">Model: {car.model}</p>
                <p className="text-gray-400">Price: {car.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="min-h-screen bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold text-green-500 mb-6">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium rounded-t-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-black text-green-400 border-b-4 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "ALL LISTINGS" && <div>All car listings here...</div>}
          {activeTab === "PENDING BOOKINGS" && (
            <div>Pending bookings here...</div>
          )}
          {activeTab === "APPROVED BOOKINGS" && (
            <div>Approved bookings here...</div>
          )}
          {activeTab === "COMPLETED BOOKINGS" && (
            <div>Completed bookings here...</div>
          )}
        </div>
      </div>
      <div>
        {[
          "PENDING BOOKINGS",
          "APPROVED BOOKINGS",
          "COMPLETED BOOKINGS",
        ].includes(activeTab) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-black p-4 rounded-xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-green-400 text-lg font-bold">
                    {booking.carName}
                  </h3>
                  <p className="text-gray-300">User: {booking.userName}</p>
                  <p className="text-gray-500 text-sm">Date: {booking.date}</p>
                  <p className="text-gray-500 text-sm">
                    Status: {booking.status}
                  </p>
                </div>

                <select
                  value={booking.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value;

                    try {
                      const res = await fetch("/api/bookings", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: booking._id,
                          status: newStatus,
                        }),
                      });

                      if (res.ok) {
                        // Optimistic UI update
                        setBookings((prev) =>
                          prev.map((b) =>
                            b._id === booking._id
                              ? { ...b, status: newStatus }
                              : b
                          )
                        );
                      } else {
                        console.error("Failed to update status");
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="mt-3 p-2 bg-gray-800 text-white border border-gray-600 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
