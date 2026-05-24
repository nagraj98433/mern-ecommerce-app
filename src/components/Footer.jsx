import React from "react";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* TOP */}

        <div className="flex flex-col justify-between gap-10 border-b border-gray-800 pb-10 md:flex-row">
          {/* BRAND */}

          <div>
            <h2 className="mb-3 text-3xl font-bold">ShopSphere</h2>

            <p className="max-w-sm text-gray-400">
              Discover premium products with fast delivery and secure payments.
            </p>
          </div>

          {/* LINKS */}

          <div>
            <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-2 text-gray-400">
              <a href="/">Home</a>

              <a href="/products">Products</a>

              <a href="/categories">Categories</a>

              <a href="/cart">Cart</a>
            </div>
          </div>

          {/* SOCIAL */}

          <div>
            <h3 className="mb-4 text-xl font-semibold">Follow Us</h3>

            <div className="flex gap-5 text-2xl text-gray-400">
              <a href="#">
                <FaGithub />
              </a>

              <a href="#">
                <FaLinkedin />
              </a>

              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="pt-6 text-center text-gray-500">
          © 2026 ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
