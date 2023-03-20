class BaseError extends Error {
  constructor(errorMessage, errStatusCode) {
    super(errorMessage);
    this.statusCode = errStatusCode;
  }
}

module.exports = BaseError;
