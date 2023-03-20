const { get } = require("lodash");
const { Unauthorized, BadRequest } = require("../../../error");
const JwtToken = require("../../../middleware/jwtToken");
const User = require("../../../view/user");
const db = require("../../../models");
const Contact = require("../../../view/contact");

const logIn = async (userName, password) => {
  await User.verifyUser(userName, password);

  const user = await User.find(userName);
  const jwtToken = new JwtToken(user.name, user.userName);
  const token = jwtToken.generateToken();

  return token;
};

const createUser = async (user) => {
  const transaction = await db.sequelize.transaction();

  try {
    await user.create(transaction);

    const jwtToken = new JwtToken(user.name, user.userName);
    const token = jwtToken.generateToken();

    transaction.commit();
    return token;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const updateUser = async (userId, user) => {
  if (!User.isExist(userId)) throw new BadRequest("User is not Exist");

  const transaction = await db.sequelize.transaction();

  try {
    const updatedUser = await User.update(userId, user, transaction);

    const jwtToken = new JwtToken(updatedUser.name, updatedUser.userName);
    const token = jwtToken.generateToken();

    transaction.commit();

    return token;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const getUser = async (userName) => {
  const user = await User.find(userName);

  return user;
};

module.exports = { logIn, createUser, updateUser, getUser };
