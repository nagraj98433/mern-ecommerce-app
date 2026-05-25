import React from "react";

function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-12 text-center shadow-2xl">
        <div className="mb-6 text-7xl">✅</div>

        <h1 className="mb-4 text-4xl font-bold">Payment Successful</h1>

        <p className="mb-8 text-lg text-gray-500">
          Thank you for your order. Your products will be delivered soon.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="rounded-xl bg-black px-8 py-4 text-white transition hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
