var path = require('path');
var fs = require('fs');
var async = require('async');
var Controller = require('./Controller');

var Home = new Controller('/home', 'get', path.basename(__filename, '.js'));
Home.specific = function(req, res, callback) {

  return async.auto({
    readPhotos: async.apply(fs.readdir, __dirname + '/../images/photos'),
    readThumbs: async.apply(fs.readdir, __dirname + '/../images/thumbnails')
  }, function (err, result) {
    if(err) {
      return console.log('error lodding files');
    }

    var dataResult = {
      photos: result.readPhotos,
      thumbnails: result.readThumbs
    };

    return callback(req, res, {data : dataResult});
  });
};

module.exports = Home;
