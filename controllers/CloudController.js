const { singleFileUpload } = require("../config/multer");
const db = require("../prisma/queries");

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
  async (req, res) => {
    const parentId = req.body.parentId;
    await db.createFile(req.body.userId, req.file, parentId);

    if (parentId) {
      res.redirect(`/cloud/${parentId}`);
    } else {
      res.redirect("/cloud");
    }
  },
];

async function newFolderPost(req, res) {
  const parentId = req.body.parentId;
  await db.createFolder(req.body.newFolder, req.body.userId, parentId);

  if (parentId) {
    res.redirect(`/cloud/${parentId}`);
  } else {
    res.redirect("/cloud");
  }
}

module.exports = {
  cloudGet,
  cloudPost,
  uploadFilePost,
  newFolderPost,
};
