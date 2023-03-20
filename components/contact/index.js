const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("./controller/contact");
const router = express.Router({ mergeParams: true });

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);
router.put("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
