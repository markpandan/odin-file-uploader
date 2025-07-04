const express = require("express");
const router = express.Router();

const controller = require("../controllers/LoginController");
router.get("/", controller.loginGet);
router.post("/", controller.loginPost);

module.exports = router;
