import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const qtyHandler = (id, qty) => {
    dispatch(
      updateQuantity({
        id,
        qty,
      }),
    );
    toast.success("Item quantity updated", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,

    0,
  );

  return (
    <>
      <PageHeader
        title="Shopping Cart"
        subtitle="
      Review your selected products
    "
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        {cartItems.length === 0 ? (
          // ✅ Premium Empty Cart UI
          <div className="flex flex-col items-center justify-center py-24 text-center">
            {/* IMAGE */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="mb-8 w-52 opacity-80"
            />

            {/* TITLE */}
            <h2 className="mb-4 text-5xl font-bold">Your Cart is Empty</h2>

            {/* SUBTITLE */}
            <p className="mb-8 max-w-md text-lg text-gray-500">
              Looks like you haven’t added anything yet. Start exploring our
              premium collection.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            {/* LEFT */}
            <div className="space-y-6 md:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center gap-6 rounded-2xl bg-white p-4 shadow-md sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-32 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <p className="text-gray-500">₹{item.price}</p>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => qtyHandler(item._id, item.qty - 1)}
                        disabled={item.qty === 1}
                        className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">{item.qty}</span>

                      <button
                        onClick={() => qtyHandler(item._id, item.qty + 1)}
                        className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeHandler(item._id)}
                    className="w-full cursor-pointer rounded-xl bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-md">
              <h2 className="mb-6 text-3xl font-bold">Order Summary</h2>

              <div className="mb-4 flex justify-between">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/shipping")}
                className="w-full cursor-pointer rounded-xl bg-black py-3 text-white"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
