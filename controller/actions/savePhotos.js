var path = require('path');
var multer  = require('multer');
var Controller = require('../Controller');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../images/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var savePhotos = new Controller('/savePhotos', 'post', path.basename(__filename, '.js'), upload.array('postPhoto'));

module.exports = savePhotos;
