import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function ShippingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");

  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );

  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      }),
    );

    navigate("/checkout");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-xl"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">
          Shipping Address
        </h1>

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-black p-3 text-white"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default ShippingPage;
