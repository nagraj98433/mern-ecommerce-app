import React from "react";

function PageHeader({
  title,

  subtitle,
}) {
  return (
    <section className="bg-linear-to-r from-black to-gray-800 py-15 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-4 text-5xl font-bold">{title}</h1>

        <p className="text-lg text-gray-300">{subtitle}</p>
      </div>
    </section>
  );
}

export default PageHeader;
