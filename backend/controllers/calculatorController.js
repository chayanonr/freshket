const calculatorService = require("../services/calculatorService");

exports.calculateOrder = (req, res) => {
  try {
    const { items, memberCard } = req.body;

    if (!items || typeof items !== "object") {
      return res.status(400).json({ error: "Invalid input! 'items' should be an object." });
    }

    const isMember = memberCard || false;
    const result = calculatorService.calculate(items, isMember);

    res.json({
      success: true,
      message: "Here’s the breakdown of your order:",
      breakdown: result.breakdown,
      memberDiscount: result.memberDiscount,
      total: result.total,
    });
  } catch (error) {

    res.status(400).json({ error: error.message });
  }
};
