const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class NotFound extends BaseError {
  constructor(errorMessage) {
    super(errorMessage, StatusCodes.NOT_FOUND);
  }
}

module.exports = NotFound;
