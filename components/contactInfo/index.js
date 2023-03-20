const express = require("express");
const {
  getContactInfos,
  getContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} = require("./controller/contactInfo");

const router = express.Router({ mergeParams: true });

router.get("/", getContactInfos);
router.get("/:contactInfoId", getContactInfo);
router.post("/", createContactInfo);
router.put("/:contactInfoId", updateContactInfo);
router.delete("/:contactInfoId", deleteContactInfo);

module.exports = router;
