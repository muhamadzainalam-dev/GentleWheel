"use client";
import React, { useState } from "react";

/**
 * FilterBar - Dropdown filter bar for sorting cars
 * @param {Function} onSort - called with selected sort/filter type
 */
const FilterBar = ({ onSort }) => {
  const [activeSort, setActiveSort] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(null); // tracks which dropdown is open

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const handleSort = (type) => {
    setActiveSort(type);
    onSort(type);
    setDropdownOpen(null);
  };

  const sortOptions = {
    price: [
      { label: "Low to High", value: "price-low" },
      { label: "High to Low", value: "price-high" },
    ],
    luxury: [
      { label: "Basic", value: "luxury-basic" },
      { label: "Standard", value: "luxury-standard" },
      { label: "Premium & Luxury", value: "luxury-premium" },
    ],
    quality: [
      { label: "Highest Rated", value: "rating" },
      { label: "Most Popular", value: "popularity" },
      { label: "Newest First", value: "newest" },
    ],
  };

  return (
    <div className="flex flex-wrap justify-end gap-4 mb-6">
      {/* Dropdowns */}
      {["price", "luxury", "quality"].map((category) => (
        <div key={category} className="relative">
          <button
            onClick={() => toggleDropdown(category)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 hover:border-green-400 transition"
          >
            {category === "price" && "Sort by Price"}
            {category === "luxury" && "Luxury Level"}
            {category === "quality" && "Sort by Quality"}
          </button>

          {/* Dropdown Items */}
          {dropdownOpen === category && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
              {sortOptions[category].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-green-500/10 transition ${
                    activeSort === option.value
                      ? "text-green-400"
                      : "text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Reset Filter */}
      <button
        onClick={() => handleSort("default")}
        className={`px-4 py-2 rounded-md border ${
          activeSort === "default"
            ? "bg-green-500/20 text-green-400 border-green-500/50"
            : "bg-gray-800 text-white border-gray-700 hover:border-green-400 hover:text-green-400"
        } transition`}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
