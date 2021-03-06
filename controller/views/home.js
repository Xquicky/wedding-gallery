var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var Controller = require('../Controller');

var home = new Controller(['/', '/home'], 'get', path.basename(__filename, '.js'));
home.specific = function(req, res, callback) {

  if(!req.session.user) {
    return res.redirect(302, '/connexion');
  }

  fs.readdir(__dirname + '/../../images/photos', function (err, files) {
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

module.exports = home;
