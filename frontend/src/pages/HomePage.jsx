import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import CartSummary from "../components/CartSummary";
import { menuItems } from "../config/menu"; // Centralized menu configuration

function HomePage() {
  const navigate = useNavigate();

  const [orderCounts, setOrderCounts] = useState(
    menuItems.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );
  const [isMember, setIsMember] = useState(false);

  const addItem = (itemName) => {
    setOrderCounts((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
  };

  const removeItem = (itemName) => {
    setOrderCounts((prev) => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 1) - 1, 0),
    }));
  };

  const goToOrderPage = () => {
    navigate("/order", { state: { orders: orderCounts, menu: menuItems, memberCard: isMember } });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Food Store Menu</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            count={orderCounts[item.name]}
            onIncrease={() => addItem(item.name)}
            onDecrease={() => removeItem(item.name)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isMember}
            onChange={() => setIsMember((prev) => !prev)}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Have a Membership Card? (10% Discount)</span>
        </label>
      </div>

      <CartSummary orders={orderCounts} menu={menuItems} />

      <div className="text-center mt-6">
        <button
          onClick={goToOrderPage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
