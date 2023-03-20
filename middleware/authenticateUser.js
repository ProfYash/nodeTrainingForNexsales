const { Unauthorized } = require("../error");
const User = require("../view/user");
const JwtToken = require("./jwtToken");

const authenticateUser = async (req, res, next) => {
  console.log("Inside authenticateUser");

  try {
    const token = req.cookies["authorization"];

    const payload = JwtToken.verifyToken(token);
    const user = await User.find(payload.userName);

    if (!user) throw new Unauthorized("User not found");

    req.userId = user.id;
    req.userName = payload.userName;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUser;
