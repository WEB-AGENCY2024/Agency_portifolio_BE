const multer = require("multer");

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

exports.mutlerCallback = multer({ fileFilter });
