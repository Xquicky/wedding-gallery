var path = require('path');
var Controller = require('./Controller');

var addPhotos = new Controller('/addphotos', 'get', path.basename(__filename, '.js'));
addPhotos.specific = function(req, res, callback) {
    return callback(req, res, undefined);
};

module.exports = addPhotos;
