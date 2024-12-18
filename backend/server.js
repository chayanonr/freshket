const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const calculatorRoutes = require("./routes/calculatorRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*"; 


const corsOptions = {
  origin: CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api", calculatorRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Food Store Calculator API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
