var path = require('path');
var multer  = require('multer');
var _ = require('lodash');
var Controller = require('./Controller');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../images/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var savePhotos = new Controller('/savePhotos', 'post', path.basename(__filename, '.js'));
savePhotos.initRoute = function(app) {
  app[this.method](this.route, upload.array('postPhoto'), _.bind(this.control, this));
};

savePhotos.specific = function(req, res, callback) {
  // auto save files with multer
  return callback(req, res, undefined);
};

savePhotos.render = function(req, res, data) {
  res.writeHeader(200, {'Content-Type': 'application/json'});
  console.timeEnd('Controller ' + this.name);
  res.write(JSON.stringify({status: 'ok'}));
  return res.end();
};

module.exports = savePhotos;
