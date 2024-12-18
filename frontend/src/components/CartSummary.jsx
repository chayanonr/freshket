import React from "react";

function CartSummary({ orders, menu }) {

  const orderedItems = Object.entries(orders).filter(([_, count]) => count > 0);

  const totalBeforeDiscounts = orderedItems.reduce((total, [itemName, count]) => {
    const menuItem = menu.find((item) => item.name === itemName); // Match the menu item
    if (!menuItem) {
      console.warn(`Menu item "${itemName}" not found in the menu. Skipping.`);
      return total;
    }
    return total + count * menuItem.price;
  }, 0);
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
      
      {orderedItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="list-disc pl-6">
          {orderedItems.map(([itemName, count]) => {
            const menuItem = menu.find((item) => item.name === itemName);
            return (
              <li key={itemName} className="text-gray-700">
                {itemName}: {count} x {menuItem.price} THB ={" "}
                <span className="font-bold">{count * menuItem.price} THB</span>
              </li>
            );
          })}
        </ul>
      )}
      
      <p className="mt-4 text-gray-700 font-semibold">
        Total Before Discounts: {totalBeforeDiscounts.toFixed(2)} THB
      </p>
    </div>
  );
}

export default CartSummary;
