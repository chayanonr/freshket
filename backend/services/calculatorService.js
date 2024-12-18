const { calculateBundleDiscount } = require("./discountEngine");
const { menuItems, memberDiscountRate } = require("../config/constants");

class CalculatorService {

  calculate(itemsCount, isMember = false) {
    let totalPrice = 0;
    let breakdown = [];

    for (const item in itemsCount) {
      const quantity = Math.max(itemsCount[item], 0);
      if (quantity === 0) continue; 

      const price = menuItems[item];
      if (!price) {
        throw new Error(`Oops! "${item}" is not on the menu.`);
      }

      const { discount, total } = calculateBundleDiscount(item, quantity, price);

      breakdown.push({
        item,
        quantity,
        unitPrice: price,
        discount: parseFloat(discount.toFixed(2)), 
        total: parseFloat(total.toFixed(2)),      
      });

      totalPrice += total;
    }

    const memberDiscount = isMember ? totalPrice * memberDiscountRate : 0;
    totalPrice -= memberDiscount;

    return {
      breakdown,
      memberDiscount: parseFloat(memberDiscount.toFixed(2)),
      total: parseFloat(totalPrice.toFixed(2)),              
    };
  }
}

module.exports = new CalculatorService();
