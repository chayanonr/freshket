class CalculatorService {
    constructor() {
      // Menu prices
      this.menu = {
        Red: 50,
        Green: 40,
        Blue: 30,
        Yellow: 50,
        Pink: 80,
        Purple: 90,
        Orange: 120,
      };
  
      // Discounts
      this.memberDiscountRate = 0.1; // 10% for members
      this.bundleDiscountRate = 0.05; // 5% for every 2 items (pairs)
      this.bundleEligibleItems = ["Orange", "Pink", "Green"]; // Items with bundle discounts
    }
  
    calculate(itemsCount, isMember = false) {
      let totalPrice = 0; // Start with zero
      let breakdown = []; // Array to store details for each item
  
      // Go through each item in the order
      for (const item in itemsCount) {
        const quantity = itemsCount[item]; // How many of this item
        const price = this.menu[item]; // Price for this item
  
        // If the item is not on the menu, throw an error
        if (!price) {
          throw new Error(`Oops! "${item}" is not on the menu.`);
        }
  
        let itemTotal = 0; // Total price for this item
        let discount = 0; // Discount for this item
  
        // Check if the item qualifies for bundle discounts
        if (this.bundleEligibleItems.includes(item)) {
          const pairs = Math.floor(quantity / 2); // How many pairs of 2
          const remaining = quantity % 2; // Leftover items that aren't in pairs
  
          // Calculate the discount for the pairs
          const discountedPairPrice = pairs * price * (1 - this.bundleDiscountRate) * 2;
          discount = pairs * price * this.bundleDiscountRate * 2;
  
          // Add price for remaining single items
          const remainingPrice = remaining * price;
  
          // Total for this item after bundle discount
          itemTotal = discountedPairPrice + remainingPrice;
        } else {
          // No bundle discount, just calculate regular price
          itemTotal = quantity * price;
        }
  
        // Add the item details to the breakdown
        breakdown.push({
          item: item,
          quantity: quantity,
          unitPrice: price,
          discount: parseFloat(discount.toFixed(2)),
          total: parseFloat(itemTotal.toFixed(2)),
        });
  
        // Add this item's total to the final price
        totalPrice += itemTotal;
      }
  
      // Apply the 10% member discount if the customer has a member card
      let memberDiscount = 0;
      if (isMember) {
        memberDiscount = totalPrice * this.memberDiscountRate;
        totalPrice -= memberDiscount;
      }
  
      // Return the full result, including breakdown, member discount, and total
      return {
        breakdown: breakdown,
        memberDiscount: parseFloat(memberDiscount.toFixed(2)),
        total: parseFloat(totalPrice.toFixed(2)),
      };
    }
  }
  
  module.exports = new CalculatorService();
  