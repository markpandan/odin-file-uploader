const { singleFileUpload } = require("../config/multer");
const { createFile, createFolder } = require("../prisma/queries");

function cloudGet(req, res) {
  res.render("index", { page: "cloud" });
}

function cloudPost(req, res) {}

const uploadFilePost = [
  singleFileUpload("uploadFile"),
  async (req, res) => {
    await createFile(req.body.userId, req.file);
    res.redirect("/cloud");
  },
];

async function newFolderPost(req, res) {
  await createFolder(req.body.newFolder, req.body.userId);
  res.redirect("/cloud");
}

module.exports = {
  cloudGet,
  cloudPost,
  uploadFilePost,
  newFolderPost,
};
