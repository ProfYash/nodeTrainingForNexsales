const Contact = require("../../../view/contact");
const db = require("../../../models");
const { BadRequest } = require("../../../error");

const getContacts = async (userId) => {
  const contacts = await Contact.getAll(userId);
  return contacts;
};

const getContact = async (userId, contactId) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");

  const contact = await Contact.getById(contactId);

  return contact;
};

const createContact = async (contact) => {
  const transaction = await db.sequelize.transaction();
  try {
    await contact.create();
    transaction.commit();
    return "Contact created";
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const updateContact = async (userId, contactId, contact) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");

  const transaction = await db.sequelize.transaction();
  try {
    await Contact.update(contactId, contact, transaction);

    transaction.commit();
    return "Contact updated";
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const deleteContact = async (userId, contactId) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");

  const transaction = await db.sequelize.transaction();
  try {
    await Contact.delete(contactId, transaction);

    transaction.commit();
    return "Contact deleted";
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
