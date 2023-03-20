const { BadRequest } = require("../../../error");
const db = require("../../../models");
const Contact = require("../../../view/contact");
const ContactInfo = require("../../../view/contactInfo");

const getContactInfos = async (userId, contactId) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");

  const contactInfos = await ContactInfo.getAll(contactId);
  return contactInfos;
};

const getContactInfo = async (userId, contactId, contactInfoId) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");

  if (!(await ContactInfo.isExist(contactInfoId, contactId)))
    throw new BadRequest("ContactInfo is not Exist");

  const contactInfo = await ContactInfo.getById(contactInfoId);

  return contactInfo;
};

const createContactInfo = async (userId, contactInfo) => {
  if (!(await Contact.isExist(contactInfo.contactId, userId)))
    throw new BadRequest("Contact is not Exist");

  const transaction = await db.sequelize.transaction();

  try {
    await contactInfo.create();
    transaction.commit();
    return "Contact info created";
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const updateContactInfo = async (
  userId,
  contactId,
  contactInfoId,
  contactInfo
) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");
  if (!(await ContactInfo.isExist(contactInfoId, contactId)))
    throw new BadRequest("Contact info is not Exist");

  const transaction = await db.sequelize.transaction();
  try {
    await ContactInfo.update(contactInfoId, contactInfo, transaction);

    transaction.commit();
    return "ContactInfo updated";
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const deleteContactInfo = async (userId, contactId, contactInfoId) => {
  if (!(await Contact.isExist(contactId, userId)))
    throw new BadRequest("Contact is not Exist");
  if (!(await ContactInfo.isExist(contactInfoId, contactId)))
    throw new BadRequest("Contact info is not Exist");

  const transaction = await db.sequelize.transaction();
  try {
    await ContactInfo.delete(contactInfoId, transaction);

    transaction.commit();
    return "ContactInfo deleted";
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

module.exports = {
  getContactInfos,
  getContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
