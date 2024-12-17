const express = require("express");
const router = express.Router();
const calculatorService = require("../services/calculatorService");

// POST /api/calculate
router.post("/calculate", (req, res) => {
  try {
    const { items, memberCard } = req.body;

    // Validate input
    if (!items || typeof items !== "object") {
      return res.status(400).json({ error: "'items' must be an object with menu counts." });
    }

    // Perform calculation
    const result = calculatorService.calculate(items, memberCard);

    // Send response
    res.json(result);
  } catch (error) {
    console.error("Error calculating order:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
