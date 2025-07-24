"use client";

import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="text-white py-16 px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl lg:text-5xl font-bold text-center text-green-500 mb-16"
        >
          About Us
        </motion.h2>

        {/* Main Card with Car Image */}
        <motion.div
          variants={cardVariants}
          className="max-w-7xl mx-auto bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-600/30 mb-12"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Car Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 p-8 flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full max-w-md"
                >
                  <img
                    src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Car"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </motion.div>

                {/* Floating elements around the car */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full opacity-60"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-40"
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-1/2 p-8 space-y-6"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Who We Are
                </h3>
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-lg leading-relaxed text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <span className="font-semibold text-green-500">
                    GentleWheel
                  </span>{" "}
                  is your go-to destination for luxury car rentals at unbeatable
                  prices. Whether you're cruising through the city or heading
                  out on a weekend getaway, we provide access to the most
                  prestigious cars without breaking the bank.
                </motion.p>

                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-lg leading-relaxed text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Our fleet features world-renowned brands like{" "}
                  <span className="text-green-400 font-semibold">BMW</span>,{" "}
                  <span className="text-green-400 font-semibold">Audi</span>,{" "}
                  <span className="text-green-400 font-semibold">
                    Mercedes-Benz
                  </span>
                  , and{" "}
                  <span className="text-green-400 font-semibold">Porsche</span>,
                  all available at prices tailored for every budget. At
                  GentleWheel, we believe luxury should be accessible, seamless,
                  and unforgettable.
                </motion.p>

                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-lg leading-relaxed text-gray-300 hover:text-white transition-colors duration-300"
                >
                  From online booking to doorstep delivery, our{" "}
                  <span className="text-green-500 font-medium">
                    smart rental platform
                  </span>{" "}
                  makes it easy to choose your dream car and hit the road in
                  style. Join thousands of satisfied drivers who trust
                  GentleWheel to upgrade their journey — effortlessly.
                </motion.p>
              </motion.div>

              {/* Service Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 mt-6"
              >
                {["🚗", "✈️", "🚌", "🏨", "🎬"].map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl hover:bg-green-500/40 transition-colors duration-300 cursor-pointer"
                  >
                    {icon}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
