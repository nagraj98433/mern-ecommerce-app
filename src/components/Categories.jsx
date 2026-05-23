import React from "react";

const categories = [
  {
    name: "Electronics",

    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000",
  },

  {
    name: "Fashion",

    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000",
  },

  {
    name: "Shoes",

    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000",
  },

  {
    name: "Accessories",

    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000",
  },
];

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-10 text-4xl font-bold">Shop By Category</h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group relative cursor-pointer overflow-hidden rounded-3xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h3 className="text-3xl font-bold text-white">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
