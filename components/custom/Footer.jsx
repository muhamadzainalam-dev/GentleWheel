import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-14 border-t border-gray-700">
      <div className="max-w-7xl mx-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm ">
        {/* Services */}
        <div>
          <h4 className="text-green-500 font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Luxury Cars Booking</li>
            <li>24/7 Conatct Support</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-green-500 font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-300">
            <li>About us</li>
            <li>FAQ</li>
            <li>Contact us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Top Rentles */}
        <div>
          <h4 className="text-green-500 font-semibold mb-4">Top Luxury Cars</h4>
          <ul className="space-y-2 text-gray-300">
            <li>BMW i7</li>
            <li>Mercedes-Benz GLB-Class</li>
            <li>Audi A8</li>
            <li>Porsche Panamera</li>
            <li>2025 Audi Q7</li>
          </ul>
        </div>

        {/* Top Buses */}
        <div>
          <h4 className="text-green-500 font-semibold mb-4">HOT Right Now</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Toyota Corolla</li>
            <li>Honda City</li>
            <li>Suzuki Swift</li>
            <li>Kia Sportage</li>
            <li>Hyundai Elantra</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-6 px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <div className="mb-4 md:mb-0 font-bold text-3xl text-white">
          Gentle<span className="text-green-500">Wheel</span><span className="text-sm ml-1 text-gray-400">.com</span>
        </div>
       
      </div>
    </footer>
  );
}
