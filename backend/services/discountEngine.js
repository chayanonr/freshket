const { bundleEligibleItems, bundleDiscountRate } = require("../config/constants");

function calculateBundleDiscount(item, quantity, price) {
  if (!bundleEligibleItems.includes(item)) {
    return { discount: 0, total: quantity * price };
  }

  const pairs = Math.floor(quantity / 2);
  const remaining = quantity % 2;

  const discount = pairs * price * 2 * bundleDiscountRate;
  const total = pairs * price * (1 - bundleDiscountRate) * 2 + remaining * price;

  return {
    discount,
    total,
  };
}

module.exports = { calculateBundleDiscount };
