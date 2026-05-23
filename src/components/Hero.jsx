import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="flex min-h-[90vh] items-center bg-black text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <p className="mb-4 text-lg text-yellow-400">New Collection 2026</p>

          <h1 className="mb-6 text-6xl leading-tight font-bold">
            Discover Premium Fashion & Electronics
          </h1>

          <p className="mb-8 text-lg text-gray-300">
            Upgrade your lifestyle with our latest premium collection.
          </p>

          <button className="rounded-xl bg-yellow-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-300">
            Shop Now
          </button>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Hero"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
