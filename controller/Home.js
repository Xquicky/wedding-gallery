var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var Controller = require('./Controller');

var Home = new Controller(['/', '/home'], 'get', path.basename(__filename, '.js'));
Home.specific = function(req, res, callback) {

  fs.readdir(__dirname + '/../images/photos', function (err, files) {
    if(err) {
      return console.log('error lodding files');
    }

    var results = [];
    _.forEach(files, function(file, key) {
      var title = path.basename(file, '.jpg');
      results.push({
        title: title,
        thumb: 'images/thumbnails/' + title + '_thumb.jpg',
        photo: 'images/photos/' + file
      });
    });

    var dataResult = {
      images: results
    };

    return callback(req, res, {data : dataResult});
  });
};

module.exports = Home;
