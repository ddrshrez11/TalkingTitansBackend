const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("../middlewares/errorMiddleware");
const { connectDB } = require("../config/db");
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("./netlify/functions/api", require("../routes/participantRoutes"));

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

module.exports.handler = serverless(app);
