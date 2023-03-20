const jsonwebtoken = require("jsonwebtoken");
const { Unauthorized } = require("../error");

class JwtToken {
  constructor(name, userName) {
    this.name = name;
    this.userName = userName;
  }

  generateToken() {
    return jsonwebtoken.sign(JSON.stringify(this), process.env.JWT_SECRET);
  }

  static verifyToken(token) {
    try {
      return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Unauthorized("User not authorized");
    }
  }
}

module.exports = JwtToken;
