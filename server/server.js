const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const Router = require("./routes/routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// setting up Cross-Origin Resource Sharing to allow the use of localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

Router(app);

// making a shorthand to access the Port number
const PORT = 3000;

// connecting the server to the database
app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
  console.log(`Server is running on port: ${PORT}`);
});