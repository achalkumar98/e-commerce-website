const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", err);
  });
