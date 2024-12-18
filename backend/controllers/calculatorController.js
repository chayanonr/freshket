const calculatorService = require("../services/calculatorService");

exports.calculateOrder = (req, res) => {
  try {
    
    const { items, memberCard = false } = req.body;

    
    if (!items || typeof items !== "object") {
      return res.status(400).json({
        error: "'items' must be a valid object containing menu items and quantities.",
      });
    }

    
    const result = calculatorService.calculate(items, memberCard);

  
    res.json({
      success: true,
      message: "Here’s your order breakdown:",
      ...result, 
    });
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
};
