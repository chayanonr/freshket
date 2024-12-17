const calculatorService = require("../services/calculatorService");

exports.calculateOrder = (req, res) => {
  try {
    const { items, memberCard } = req.body;

    // Validate the input to make sure it's correct
    if (!items || typeof items !== "object") {
      return res.status(400).json({ error: "Invalid input! 'items' should be an object." });
    }

    // Check if the customer has a member card
    const isMember = memberCard || false;

    // Get the result from the calculator service
    const result = calculatorService.calculate(items, isMember);

    // Send back the detailed result
    res.json({
      success: true,
      message: "Here’s the breakdown of your order:",
      breakdown: result.breakdown,
      memberDiscount: result.memberDiscount,
      total: result.total,
    });
  } catch (error) {
    // Handle errors gracefully
    res.status(400).json({ error: error.message });
  }
};
