const express = require("express");
const router = express.Router();
const util = require("../utils/authUtils");
const { singleFileUpload } = require("../config/multer");

const controller = require("../controllers/CloudController");
router.get("/", util.isAuth, controller.cloudGet);
router.post("/", util.isAuth, controller.cloudPost);

router.post("/upload-file", singleFileUpload("uploadFile"), (req, res) => {
  res.redirect("/cloud");
});

module.exports = router;
