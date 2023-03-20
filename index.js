require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const router = require("./components");
const errorHandleMiddleware = require("./middleware/errorHandleMiddleware");
const { NotFound } = require("./error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (req, res, next) => {
  res.send("pong");
});

app.use("/api/v1", router);

app.use("*", (req, res, next) => {
  next(new NotFound("Route not found"));
});

app.use(errorHandleMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`App listing ${process.env.PORT} \n\n\n\n\n`);
});
