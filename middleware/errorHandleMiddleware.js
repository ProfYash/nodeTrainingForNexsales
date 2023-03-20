const { StatusCodes } = require("http-status-codes");
const BaseError = require("../error/baseError");

const errorHandleMiddleware = (err, req, res, next) => {
  console.log("Inside errorHandle Middleware");
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ errMessage: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ errMessage: err.message });
};

module.exports = errorHandleMiddleware;
