const express = require("express");
const authenticateUser = require("../../middleware/authenticateUser");
const { createUser, updateUser, getUser } = require("./controller/user");

const router = express.Router({ mergeParams: true });

router.post("/", createUser);
router.get("/", authenticateUser, getUser);
router.put("/:userId", authenticateUser, updateUser);

module.exports = router;
