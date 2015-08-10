var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');

var readdirController = function(app, folderPath, isAction, callback) {
  fs.readdir(folderPath, function(err, files) {

    if(err) {
      console.dir(err);
      return console.error('fail reading dir');
    }

    _.forEach(files, function(file, key) {
      if(file !== '.' && file !== '..' && path.extname(file) === '.js') {
        var requiredFile = folderPath + path.basename(file, '.js');
        var controller = require('../' + requiredFile);
        controller.init(app);
        controller.contentOnly = isAction;
      }
    });
  });
  return callback();
};

var initControllers = function (app) {
  return async.parallel({
    readFolderActions: async.apply(readdirController, app, 'controller/actions/', true),
    readFolderViews: async.apply(readdirController, app, 'controller/views/', false)
  });
};

module.exports = initControllers;
