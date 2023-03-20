const { StatusCodes } = require("http-status-codes");
const {
  logIn: logInService,
  createUser: createUserService,
  updateUser: updateUserService,
  getUser: getUserService,
} = require("../service/user");
const User = require("../../../view/user");
const { BadRequest } = require("../../../error");
const { isEmpty } = require("lodash");

const logIn = async (req, res, next) => {
  console.log("Inside logIn Controller");

  try {
    const { userName, password } = req.body || {};

    if (!userName) {
      throw new BadRequest("userName is required");
    }
    if (!password) {
      throw new BadRequest("password is required");
    }

    const token = await logInService(userName, password);

    res.cookie("authorization", token);

    return res.status(StatusCodes.OK).send("Login Successful");
  } catch (error) {
    console.error(`[User_Controller]:: ERROR: ${error}`);
    console.error(error);

    next(error);
  }
};

const createUser = async (req, res, next) => {
  console.log("Inside createUser Controller");

  try {
    const { name, userName, password } = req.body || {};

    if (!name) {
      throw new BadRequest("name is required");
    }
    if (!userName) {
      throw new BadRequest("userName is required");
    }
    if (!password) {
      throw new BadRequest("password is required");
    }

    const user = new User(name, userName, password);
    const token = await createUserService(user);

    res.cookie("authorization", token);
    return res.status(StatusCodes.CREATED).send("User created successfully");
  } catch (error) {
    console.error(`[User_Controller]:: ERROR: ${error}`);

    next(error);
  }
};

const updateUser = async (req, res, next) => {
  console.log("Inside update User Controller");

  try {
    const { userId } = req.params || {};
    const user = req.body || {};

    if (!userId) throw new BadRequest("userId is required");
    if (isEmpty(user)) throw new BadRequest("User data is required");

    const token = await updateUserService(userId, user);

    res.cookie("authorization", token);
    return res.status(StatusCodes.OK).send("User updated");
  } catch (error) {
    console.error(`[User_Controller]:: ERROR: ${error}`);

    next(error);
  }
};

const getUser = async (req, res, next) => {
  console.log("Inside getUser Controller");

  try {
    const user = await getUserService(req.userName);

    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    console.error(`[User_Controller]:: ERROR: ${error}`);

    next(error);
  }
};

module.exports = { logIn, createUser, updateUser, getUser };
