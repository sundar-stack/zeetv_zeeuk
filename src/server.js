const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log("mongo error", err);
  } else {
    console.log("Successfully connected to DB");
  }
});

//route setup
const { API_ENDPOINT_CONFIG } = require("./constants/ApiConfig");
const router = require("./routes/routeHandler");
app.use(API_ENDPOINT_CONFIG.BASE_END_POINT, router);

///global error handler
const globalErrorHandler = require("./controllers/ErrorController");
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
