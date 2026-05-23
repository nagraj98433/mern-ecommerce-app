import React from "react";

function FilterSidebar({
  selectedCategory,

  setSelectedCategory,

  sortOption,

  setSortOption,
}) {
  const categories = ["All", "Electronics", "Fashion", "Shoes", "Accessories"];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      {/* CATEGORY */}

      <h2 className="mb-6 text-2xl font-bold">Categories</h2>

      <div className="mb-10 flex flex-col gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-xl px-4 py-3 text-left transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-100"
            } `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* SORT */}

      <h2 className="mb-6 text-2xl font-bold">Sort By</h2>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option value="">Default</option>

        <option value="lowToHigh">Price Low To High</option>

        <option value="highToLow">Price High To Low</option>
      </select>
    </div>
  );
}

export default FilterSidebar;
