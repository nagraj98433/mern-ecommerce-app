import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

import { Link } from "react-router-dom";

function FeaturedCarousel({ products }) {
  return (
    <section className="h-[90vh] w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
        }}
        loop
        className="h-full"
      >
        {products.slice(0, 5).map((product) => (
          <SwiperSlide key={product._id}>
            <div className="relative h-[90vh]">
              {/* IMAGE */}

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-black/50" />

              {/* CONTENT */}

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-7xl px-6 text-white">
                  <p className="mb-4 text-lg text-yellow-400">
                    PREMIUM COLLECTION
                  </p>

                  <h1 className="mb-6 max-w-3xl text-5xl leading-tight font-bold md:text-7xl">
                    {product.name}
                  </h1>

                  <p className="mb-10 max-w-2xl text-lg text-gray-200 md:text-xl">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-5">
                    <Link
                      to={`/product/${product._id}`}
                      className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:bg-gray-200"
                    >
                      Shop Now
                    </Link>

                    <button className="rounded-2xl border border-white px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-black">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default FeaturedCarousel;
