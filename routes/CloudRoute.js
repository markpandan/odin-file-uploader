const express = require("express");
const router = express.Router();

const controller = require("../controllers/CloudController");
router.get("/", controller.cloudGet);
router.post("/", controller.cloudPost);

module.exports = router;
