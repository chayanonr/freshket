import React from "react";

function MenuItem({ item, count, onIncrease, onDecrease }) {
  return (
    <div className="border rounded-lg p-4 shadow-md text-center w-48">
      {/* Display image */}
      <img
        src={item.image}
        alt={`${item.name} Set`}
        className="w-full h-32 object-cover mb-3"
      />

      {/* Display name and price */}
      <h3 className="font-semibold">{item.name} Set</h3>
      <p>{item.price} THB</p>

      {/* Show promotion*/}
      {item.promotion && (
        <div className="mt-2">
          <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
            {item.promotion}
          </span>
        </div>
      )}

      {/* Quantity*/}
      <div className="flex justify-center items-center gap-3 mt-3">
        <button
          onClick={onDecrease}
          disabled={count === 0}
          className={`px-2 py-1 rounded ${
            count === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          -
        </button>
        <span className="font-bold">{count}</span>
        <button
          onClick={onIncrease}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
