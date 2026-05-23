import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,

    0,
  );

  // razoerpay payment integration will be here

  const paymentHandler = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",

      {
        amount: totalPrice,
      },
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: data.amount,

      currency: data.currency,

      name: "UrbanCart",

      description: "Order Payment",

      order_id: data.id,

      handler: function (response) {
        alert("Payment Successful");

        console.log(response);
      },

      theme: {
        color: "#000",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-4xl font-bold">Checkout</h1>

      <div className="grid gap-10 md:grid-cols-2">
        {/* SHIPPING */}

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Shipping Details
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Address:</span>
              <p>{shippingAddress.address}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold">City:</span>
              <p>{shippingAddress.city}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold">Postal Code:</span>
              <p>{shippingAddress.postalCode}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold">Country:</span>
              <p>{shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* ORDER */}

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id} className="mb-4 flex justify-between">
              <span>{item.name}</span>

              <span>
                ₹{item.price}x{item.qty}
              </span>
            </div>
          ))}

          <hr className="my-6" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={paymentHandler}
            className="mt-8 w-full cursor-pointer rounded-xl bg-black py-3 text-white"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
