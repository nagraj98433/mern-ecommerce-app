import React from "react";

const categories = [
  {
    name: "Mobiles",

    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },

  {
    name: "Laptops",

    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },

  {
    name: "Fashion",

    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
  },

  {
    name: "Gaming",

    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
  },
];

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-10 text-4xl font-bold">Categories</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-72 w-full object-cover transition group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h2 className="text-3xl font-bold text-white">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
