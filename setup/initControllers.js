var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var initControllers = function (app) {

  fs.readdir('controller', function(err, files) {

    if(err) {
      return console.error('fail reading dir');
    }

    _.forEach(files, function(file, key) {
      if(file !== '.' && file !== '..' && file !== 'Controller.js') {
        var controller = require('../controller/' + path.basename(file, '.js'));
        controller.initRoute(app);
      }
    });

  });

};
module.exports = initControllers;
