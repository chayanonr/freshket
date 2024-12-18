import React from "react";

function MenuItem({ item, count, onIncrease, onDecrease }) {
  return (
    <div className="border rounded-lg p-4 shadow-md text-center w-48">
      <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-3" />
      <h3 className="font-semibold">{item.name} Set</h3>
      <p>{item.price} THB</p>

      {item.promotion && (
        <p className="text-sm text-green-600 font-bold mt-2">
          {item.promotion}
        </p>
      )}

      <div className="flex justify-center items-center gap-3 mt-3">
        <button
          onClick={onDecrease}
          disabled={count === 0}
          className={`px-2 py-1 rounded ${
            count === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
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
