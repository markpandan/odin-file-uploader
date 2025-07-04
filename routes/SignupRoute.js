const express = require("express");
const router = express.Router();

const controller = require("../controllers/SignupController");
router.get("/", controller.signupGet);
router.post("/", controller.signupPost);

module.exports = router;
