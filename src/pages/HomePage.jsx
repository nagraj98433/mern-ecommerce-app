import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FilterSidebar from "../components/FilterSidebar";
import Rating from "../components/Rating";
import FeaturedCarousel from "../components/FeaturedCarousel";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Something went wrong while fetching products.",
        );
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Filter products
  const filteredProducts = products

    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()

        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })

    .sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortOption === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });

  // pagination logic

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // ✅ Conditional rendering for loading and error states
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Hero />
      <FeaturedCarousel products={products} />
      <Categories />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">Trending Products</h1>

        <div className="grid gap-10 lg:grid-cols-4">
          {/* SIDEBAR */}
          <div>
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>

          {/* PRODUCTS */}
          <div className="lg:col-span-3">
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-10 w-full rounded-2xl border p-4"
            />

            {/* GRID */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover"
                  />

                  <div className="p-5">
                    <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                    <Rating value={product.rating} />
                    <p className="mt-1 text-sm text-gray-500">
                      {product.numReviews}
                      reviews
                    </p>
                    <p className="mb-4 text-gray-500">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold">₹{product.price}</h3>
                      <button className="rounded-xl bg-black px-4 py-2 text-white">
                        View
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-4">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => setCurrentPage(number + 1)}
                  className={`rounded-xl px-5 py-3 font-semibold ${
                    currentPage === number + 1
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  } `}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
