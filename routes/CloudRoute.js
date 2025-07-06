const express = require("express");
const router = express.Router();
const util = require("../utils/authUtils");

const controller = require("../controllers/CloudController");

router.get("/:folderId", util.isAuth, controller.cloudGet);
// TODO: Remove this middleware since this, and the other middleware that carries the folderId params is being called together
router.get("/", util.isAuth, controller.cloudGet);

router.post("/:folderId/rename/:fileId", controller.renameFilePost);

// router.get("/file/:fileId");

router.post("/upload-file", controller.uploadFilePost);
router.post("/new-folder", controller.newFolderPost);

module.exports = router;
