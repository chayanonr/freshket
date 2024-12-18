import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateOrder } from "../services/api";

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data passed from HomePage
  const { orders = {}, menu = [], memberCard = false } = location.state || {};

  const [calculationResult, setCalculationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Redirect to homepage if no valid data is passed
    if (!menu.length || Object.keys(orders).length === 0) {
      console.warn("Missing menu or orders data. Redirecting to homepage.");
      navigate("/");
      return;
    }

    // Prepare the payload and call the calculateOrder API
    const payload = { items: orders, memberCard };
    console.log("Sending payload to backend:", payload);

    calculateOrder(payload)
      .then((response) => {
        console.log("Calculation response:", response);
        setCalculationResult(response);
      })
      .catch((error) => {
        console.error("Error calculating order:", error.message);
        setErrorMessage("Failed to calculate the order. Please try again.");
      });
  }, [menu, orders, memberCard, navigate]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Order Summary</h1>

      {/* Display error message if API call fails */}
      {errorMessage && (
        <p className="text-red-600 text-center mb-4 font-semibold">{errorMessage}</p>
      )}

      {/* Show loading or order details */}
      {!calculationResult ? (
        <p className="text-center text-gray-600">Calculating your order...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Item Breakdown</h2>
          <ul className="space-y-3">
            {calculationResult.breakdown.map((item) => (
              <li key={item.item} className="flex justify-between border-b pb-2 text-gray-600">
                <div>
                  <span className="font-bold">{item.item}</span>: {item.quantity} x{" "}
                  {item.unitPrice} THB
                </div>
                <div>
                  <p>Before Discount: {item.quantity * item.unitPrice} THB</p>
                  {item.discount > 0 && (
                    <p className="text-sm text-red-500">Discount: -{item.discount} THB</p>
                  )}
                  <p className="font-bold">Total: {item.total} THB</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Show membership discount*/}
          {calculationResult.memberDiscount > 0 && (
            <div className="mt-4 text-green-600 font-semibold">
              Membership Discount: -{calculationResult.memberDiscount} THB
            </div>
          )}

          {/* Show totals */}
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold text-gray-700">
              Total Before Discounts:{" "}
              {calculationResult.breakdown.reduce(
                (sum, item) => sum + item.quantity * item.unitPrice,
                0
              )}{" "}
              THB
            </p>
            <h3 className="text-2xl font-bold text-gray-800">
              Final Total: {calculationResult.total} THB
            </h3>
          </div>

          {/* Back to menu*/}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
