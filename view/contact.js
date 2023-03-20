const db = require("../models");

class Contact {
  constructor(firstName, lastName, userId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userId = userId;
  }

  static async getAll(userId) {
    const contacts = await db.Contact.findAll({
      where: {
        userId,
      },
      include: { model: db.ContactInfo },
    });
    return contacts;
  }

  static async getById(contactId) {
    const contact = await db.Contact.findOne({
      where: {
        id: contactId,
      },
      include: { model: db.ContactInfo },
    });
    return contact;
  }

  async create(transaction) {
    await db.Contact.create(this, { transaction });
  }

  static async update(contactId, contact, transaction) {
    await db.Contact.update(
      contact,
      { where: { id: contactId } },
      { transaction }
    );
  }

  static async delete(contactId, transaction) {
    await db.Contact.destroy({ where: { id: contactId }, transaction });
  }

  static async isExist(contactId, userId) {
    const contact = await db.Contact.findOne({
      where: {
        id: contactId,
        userId: userId,
      },
    });
    return !!contact;
  }
}

module.exports = Contact;
