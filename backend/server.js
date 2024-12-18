const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const calculatorRoutes = require("./routes/calculatorRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
  "http://localhost:3000",
  process.env.CORS_ORIGIN || "*"
];


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request
    }
  },
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use("/api", calculatorRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Food Store Calculator API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
