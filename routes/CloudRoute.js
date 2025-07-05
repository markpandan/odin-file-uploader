const express = require("express");
const router = express.Router();
const util = require("../utils/authUtils");

const controller = require("../controllers/CloudController");
router.get("/", util.isAuth, controller.cloudGet);
router.post("/", util.isAuth, controller.cloudPost);

module.exports = router;
