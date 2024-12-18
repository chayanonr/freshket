const { bundleEligibleItems, bundleDiscountRate } = require("../config/constants");

function calculateBundleDiscount(item, quantity, price) {
  console.log(`Calculating bundle discount for item: ${item}, quantity: ${quantity}, unit price: ${price}`);
  if (!bundleEligibleItems.includes(item)) {
    console.log(`Item "${item}" is not eligible for a bundle discount.`);
    return { discount: 0, total: quantity * price };
  }

  const pairs = Math.floor(quantity / 2);
  const remaining = quantity % 2;
  console.log(`Item "${item}" forms ${pairs} pair(s) and has ${remaining} remaining item(s).`);

  const discount = pairs * price * 2 * bundleDiscountRate;
  console.log(`Bundle discount for item "${item}": ${discount} THB`);

  const total = pairs * price * (1 - bundleDiscountRate) * 2 + remaining * price;
  console.log(`Total price for item "${item}" after discount: ${total} THB`);

  return {
    discount,
    total,
  };
}

module.exports = { calculateBundleDiscount };
