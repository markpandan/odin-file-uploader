const express = require("express");
const router = express.Router();
const util = require("../utils/authUtils");

const controller = require("../controllers/CloudController");

router.get("/:folderId", util.isAuth, controller.cloudGet);
router.get("/", util.isAuth, controller.cloudGet);

// router.get("/file/:fileId");

router.post("/upload-file", controller.uploadFilePost);
router.post("/new-folder", controller.newFolderPost);

module.exports = router;
