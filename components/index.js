const express = require("express");

const userRouter = require("./user");
const contactRouter = require("./contact");
const contactInfoRouter = require("./contactInfo");
const { logIn } = require("./user/controller/user");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router({ mergeParams: true });

router.post("/login", logIn);
router.use("/user", userRouter);
router.use("/user/contact", authenticateUser, contactRouter);
router.use(
  "/user/contact/:contactId/info",
  authenticateUser,
  contactInfoRouter
);

module.exports = router;
