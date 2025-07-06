const multer = require("multer");
const mime = require("mime-types");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = `./uploads/${req.body.userId}`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const fileName = crypto.randomUUID();
    const fileExtension = mime.extension(file.mimetype);
    cb(null, fileName + "." + fileExtension);
  },
});

const upload = multer({ storage });

const singleFileUpload = (inputField) => upload.single(inputField);

module.exports = {
  singleFileUpload,
};
