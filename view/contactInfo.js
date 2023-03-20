const db = require("../models");

class ContactInfo {
  constructor(type, number, contactId) {
    this.type = type;
    this.number = number;
    this.contactId = contactId;
  }

  static async getAll(contactId) {
    const contactInfos = await db.ContactInfo.findAll({
      where: {
        contactId,
      },
    });
    return contactInfos;
  }

  static async getById(contactInfoId) {
    const contactInfo = await db.ContactInfo.findOne({
      where: {
        id: contactInfoId,
      },
    });
    return contactInfo;
  }

  async create(transaction) {
    await db.ContactInfo.create(this, { transaction });
  }

  static async update(contactInfoId, contactInfo, transaction) {
    await db.ContactInfo.update(
      contactInfo,
      { where: { id: contactInfoId } },
      { transaction }
    );
  }

  static async delete(contactInfoId, transaction) {
    await db.ContactInfo.destroy({ where: { id: contactInfoId }, transaction });
  }

  static async isExist(contactInfoId, contactId) {
    const contact = await db.ContactInfo.findOne({
      where: {
        id: contactInfoId,
        contactId: contactId,
      },
    });
    return !!contact;
  }
}

module.exports = ContactInfo;
