const { get } = require("lodash");
const db = require("./../models");

class User {
  constructor(name, userName, password) {
    this.name = name;
    this.userName = userName;
    this.password = password;
  }

  async setId(id) {
    this.id = id;
  }

  async create(transaction) {
    await db.User.create(this, { transaction });
  }

  static async update(userId, user, transaction) {
    const [isUpdate, [updatedUser]] = await db.User.update(
      user,
      { where: { id: userId }, returning: true },
      { transaction }
    );
    return updatedUser;
  }

  static async verifyUser(userName, password) {
    const user = await db.User.findOne({
      attributes: ["password"],
      where: {
        userName,
      },
    });
    if (get(user, "password", null) !== password)
      throw new Unauthorized("User not Valid");
  }

  static async find(userName) {
    const user = await db.User.findOne({
      attributes: ["id", "name", "userName"],
      include: { model: db.Contact, include: { model: db.ContactInfo } },
      where: {
        userName,
      },
    });
    return user;
  }

  static async getList() {
    const users = await db.User.findAll();
    return users;
  }

  static async getAllDetails(userId) {
    const user = await db.User.findOne({
      include: { model: db.Contact, include: { model: db.ContactInfo } },
      where: {
        id: userId,
      },
    });
    return user;
  }

  static async isExist(userId) {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    return !!user;
  }
}

module.exports = User;
