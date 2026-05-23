import React from "react";

function Loader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

        <h2 className="text-2xl font-semibold text-gray-700">
          Loading Products...
        </h2>
      </div>
    </div>
  );
}

export default Loader;
