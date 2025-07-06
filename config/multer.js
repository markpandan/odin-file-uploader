const multer = require("multer");
const upload = multer({ dest: "./uploads" });

function singleFileUpload(inputField) {
  return upload.single(inputField);
}

module.exports = {
  singleFileUpload,
};
