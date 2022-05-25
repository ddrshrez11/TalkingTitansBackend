const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const { connectDB } = require("./config/db");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  res.header("Content-Range", "posts 0-24/319");
  next();
});

app.use("/", require("./routes/participantRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/participants", require("./routes/participantRoutesAdmin"));
app.use("/api/khalti", require("./routes/khaltiRoutesAdmin"));
app.use("/api/cash", require("./routes/cashRoutesAdmin"));
app.use("/api/sbkhalti", require("./routes/sbkhaltiRoutesAdmin"));
app.use("/api/sbesewa", require("./routes/sbesewaRoutesAdmin"));
app.use("/api/paid", require("./routes/paidRoutesAdmin"));
app.use("/api/unpaid", require("./routes/unpaidRoutesAdmin"));

// app.use("./netlify/functions/api", require("./routes/participantRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
