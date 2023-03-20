const { StatusCodes } = require("http-status-codes");
const {
  getContacts: getContactsService,
  getContact: getContactService,
  createContact: createContactService,
  updateContact: updateContactService,
  deleteContact: deleteContactService,
} = require("../service/contact");
const Contact = require("../../../view/contact");
const { isEmpty } = require("lodash");

const getContacts = async (req, res, next) => {
  try {
    const { userId } = req || {};

    const contactList = await getContactsService(userId);

    return res.status(StatusCodes.OK).send(contactList);
  } catch (error) {
    console.error(`[CONTACT_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

const getContact = async (req, res, next) => {
  console.log("Inside get contact by id Controller");

  try {
    const { userId } = req || {};
    const { contactId } = req.params || {};

    if (!contactId) throw new BadRequest("contactId is required");

    const contact = await getContactService(userId, contactId);

    return res.status(StatusCodes.OK).send(contact);
  } catch (error) {
    console.error(`[Contact_Controller]:: ERROR: ${error}`);

    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { userId } = req || {};
  const { firstName, lastName } = req.body || {};

  try {
    if (!firstName) {
      throw new BadRequest("firstName is required");
    }
    if (!lastName) {
      throw new BadRequest("lastName is required");
    }

    const contact = new Contact(firstName, lastName, userId);

    const result = await createContactService(contact);

    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    console.error(`[CONTACT_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

const updateContact = async (req, res, next) => {
  console.log("Inside update contact Controller");

  try {
    const { userId } = req || {};
    const { contactId } = req.params || {};
    const contact = req.body || {};

    if (!contactId) throw new BadRequest("contactId is required");
    if (isEmpty(contact)) throw new BadRequest("Contact data is required");

    const result = await updateContactService(userId, contactId, contact);

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(`[Contact_Controller]:: ERROR: ${error}`);

    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  console.log("Inside delete contact Controller");

  try {
    const { userId } = req || {};
    const { contactId } = req.params || {};

    if (!contactId) throw new BadRequest("contactId is required");

    const result = await deleteContactService(userId, contactId);

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(`[Contact_Controller]:: ERROR: ${error}`);

    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
