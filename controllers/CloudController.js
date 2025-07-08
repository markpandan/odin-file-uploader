const db = require("../prisma/queries");
const { singleFileUpload } = require("../config/multer");
const { uploadToCloud } = require("../config/cloudinary");
const routeCorrectUrl = require("../utils/routeCorrectUrl");

async function cloudGet(req, res) {
  const userId = req.user.id;
  const folderId = req.params.folderId;

  const files = await db.getFilesById(userId, folderId);
  const folders = await db.getFoldersById(userId, folderId);
  const directories = await db.getDirectories(folderId);

  res.locals.parentId = folderId;

  res.render("index", { page: "cloud", files, folders, directories });
}

function cloudPost(req, res) {}

const uploadFilePost = [
  singleFileUpload("uploadFile"),
  async (req, res, next) => {
    const parentId = req.body.parentId;

    try {
      await db.createFile(req.body.userId, req.file, parentId);
      await uploadToCloud(req.file.path, req.file.destination);
    } catch (error) {
      next(error);
      return;
    }

    const url = routeCorrectUrl("cloud", parentId);
    res.redirect(url);
  },
];

async function newFolderPost(req, res) {
  const parentId = req.body.parentId;
  await db.createFolder(req.body.newFolder, req.body.userId, parentId);

  const url = routeCorrectUrl("cloud", parentId);
  res.redirect(url);
}

async function renameFilePost(req, res) {
  const parentId = req.params.folderId;
  await db.updateFileById(req.params.fileId, req.body.newNameFile);

  const url = routeCorrectUrl("cloud", parentId);
  res.redirect(url);
}

module.exports = {
  cloudGet,
  cloudPost,
  uploadFilePost,
  newFolderPost,
  renameFilePost,
};
