const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const calculatorRoutes = require("./routes/calculatorRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*"; // Allow all if not specified


// CORS Configuration
const corsOptions = {
  origin: CORS_ORIGIN, // Allow specified origin or all
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes for the calculator API
app.use("/api", calculatorRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Food Store Calculator API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
