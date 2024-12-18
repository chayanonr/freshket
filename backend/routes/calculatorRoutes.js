const express = require("express");
const router = express.Router();
const calculatorService = require("../services/calculatorService");

router.post("/calculate", (req, res) => {
  try {
    const { items, memberCard } = req.body;

    if (!items || typeof items !== "object") {
      return res.status(400).json({ error: "'items' must be an object with menu counts." });
    }

    const result = calculatorService.calculate(items, memberCard);

    res.json(result);
  } catch (error) {
    console.error("Error calculating order:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
