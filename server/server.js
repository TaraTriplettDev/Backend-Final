const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();


// setting up Cross-Origin Resource Sharing

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// setting up express to use json

app.use(express.json());


// accessing the routes

Router(app);


// making a shorthand way to access the Port number

const PORT = 3000;


// connecting the server to the database

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
  console.log(`Server is running on port: ${PORT}`);
});