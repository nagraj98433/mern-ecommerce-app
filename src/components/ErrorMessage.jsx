import React from "react";

import { FaExclamationTriangle } from "react-icons/fa";

function ErrorMessage({ message }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">
        <FaExclamationTriangle className="mx-auto mb-6 text-6xl text-red-500" />

        <h2 className="mb-4 text-3xl font-bold">Oops!</h2>

        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
