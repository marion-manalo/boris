"use client";

import { useState } from "react";

const Searchbar = () => {
  const [ticker, setTicker] = useState("");

  const handleSearch = () => {
    if (ticker.trim() !== "") {
      console.log(`Searching for stock: ${ticker}`);
      // Handle navigation or API call here
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <input
        type="text"
        placeholder="Enter stock ticker..."
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        className="border border-gray-300 rounded-l-md p-2 w-64 text-gray-700 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
