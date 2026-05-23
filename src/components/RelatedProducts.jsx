import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";

import "swiper/css/navigation";

import { Link } from "react-router-dom";

function RelatedProducts({ products }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-bold">You May Also Like</h2>

        <Swiper
          modules={[Navigation]}
          navigation
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },

            640: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="block overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="mb-2 text-2xl font-bold">{product.name}</h3>

                  <p className="mb-4 text-gray-500">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{product.price}</span>

                    <button className="rounded-xl bg-black px-4 py-2 text-white">
                      View
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default RelatedProducts;
