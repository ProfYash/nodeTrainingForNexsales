const {
  getContactInfos: getContactInfosService,
  getContactInfo: getContactInfoService,
  createContactInfo: createContactInfoService,
  updateContactInfo: updateContactInfoService,
  deleteContactInfo: deleteContactInfoService,
} = require("../service/contactInfo");
const ContactInfo = require("../../../view/contactInfo");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../../../error");
const { isEmpty } = require("lodash");

const getContactInfos = async (req, res, next) => {
  console.log("Inside get contact info list Controller");
  try {
    const { userId } = req || {};
    const { contactId } = req.params || {};

    const contactInfoList = await getContactInfosService(userId, contactId);

    return res.status(StatusCodes.OK).send(contactInfoList);
  } catch (error) {
    console.error(`[CONTACT_INFO_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

const getContactInfo = async (req, res, next) => {
  console.log("Inside get contact info Controller");

  try {
    const { userId } = req || {};
    const { contactId, contactInfoId } = req.params || {};

    if (!contactId) throw new BadRequest("contactId is required");
    if (!contactInfoId) throw new BadRequest("contactInfoId is required");

    const contactInfo = await getContactInfoService(
      userId,
      contactId,
      contactInfoId
    );

    return res.status(StatusCodes.OK).send(contactInfo);
  } catch (error) {
    console.error(`[CONTACT_INFO_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

const createContactInfo = async (req, res, next) => {
  const { userId } = req || {};
  const { contactId } = req.params || {};
  const { type, number } = req.body || {};

  try {
    if (!contactId) throw new BadRequest("contactId is required");
    if (!type) throw new BadRequest("type is required");
    if (!number) throw new BadRequest("number is required");

    const contactInfo = new ContactInfo(type, number, contactId);
    const result = await createContactInfoService(userId, contactInfo);

    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    console.error(`[CONTACT_INFO_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

const updateContactInfo = async (req, res, next) => {
  console.log("Inside update contact info Controller");

  try {
    const { userId } = req || {};
    const { contactId, contactInfoId } = req.params || {};
    const contactInfo = req.body || {};

    if (!contactId) throw new BadRequest("contactId is required");
    if (!contactInfoId) throw new BadRequest("contactInfoId is required");
    if (isEmpty(contactInfo)) throw new BadRequest("Contact data is required");

    const result = await updateContactInfoService(
      userId,
      contactId,
      contactInfoId,
      contactInfo
    );

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(`[CONTACT_INFO_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

const deleteContactInfo = async (req, res, next) => {
  console.log("Inside delete contact info Controller");

  try {
    const { userId } = req || {};
    const { contactId, contactInfoId } = req.params || {};

    if (!contactId) throw new BadRequest("contactId is required");
    if (!contactInfoId) throw new BadRequest("contactInfoId is required");

    const result = await deleteContactInfoService(
      userId,
      contactId,
      contactInfoId
    );

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(`[CONTACT_INFO_CONTROLLER]:: ERROR: ${error}`);

    next(error);
  }
};

module.exports = {
  getContactInfos,
  getContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
