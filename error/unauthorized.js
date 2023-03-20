const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class Unauthorized extends BaseError {
  constructor(errorMessage) {
    super(errorMessage, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = Unauthorized;
