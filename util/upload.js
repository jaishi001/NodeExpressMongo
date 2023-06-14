const multer = require("multer");

//SET FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + "-" + Date.now());
  },
});

const filter = function (req, file, callback) {
  const mimeType = file.mimetype;
  if (mimeType === "image/png" || mimeType === "image/jgp") {
    callback(null, true);
  } else {
    callback(new Error("Invalid File Type").message, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });
module.exports = upload;
