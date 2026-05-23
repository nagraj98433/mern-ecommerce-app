import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import { useSelector } from "react-redux";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.user);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
      }),
    );

    // ✅ Show toast notification
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      toastId: product._id, // unique per product
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);

        // ✅ Show error toast
        toast.error("Failed to load product", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  //   review submit handler

  const reviewHandler = async (e) => {
    e.preventDefault();

    // ✅ Validation checks
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment || comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
        name: userInfo?.name || "Guest",
        rating,
        comment,
      });

      toast.success("Review Added ✅");

      // Reset form fields
      setRating("");
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review ❌");
    }
  };

  return (
    <>
      {/* TOP SECTION */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-2">
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl shadow-lg"
        />

        {/* PRODUCT INFO */}
        <div>
          <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>

          {/* Rating + Review Count */}
          <div className="mb-4 flex items-center gap-3">
            <Rating value={product.rating} />
            <span className="text-gray-500">
              ({product.numReviews} reviews)
            </span>
          </div>

          <p className="mb-6 text-gray-600">{product.description}</p>
          <h2 className="mb-6 text-3xl font-bold">₹{product.price}</h2>

          <button
            onClick={addToCartHandler}
            className="cursor-pointer rounded-xl bg-black px-8 py-3 text-white transition hover:bg-gray-800"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-6 text-3xl font-bold">Reviews</h2>

        {/* REVIEW LIST */}
        <div className="mb-10 space-y-6">
          {product?.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-xl font-bold">{review.name}</h3>
                <Rating value={review.rating} />
                <p className="mt-4 text-gray-600">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first!</p>
          )}
        </div>

        {/* REVIEW FORM */}
        <form
          onSubmit={reviewHandler}
          className="rounded-2xl bg-white p-8 shadow-md"
        >
          <h3 className="mb-6 text-2xl font-bold">Write a Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mb-4 w-full rounded-xl border p-3"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Write review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-6 w-full rounded-xl border p-4"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-black px-8 py-3 text-white transition hover:bg-gray-800"
          >
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
}

export default ProductPage;
