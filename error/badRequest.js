const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class BadRequest extends BaseError {
  constructor(errorMessage) {
    super(errorMessage, StatusCodes.BAD_REQUEST);
  }
}

module.exports = BadRequest;
