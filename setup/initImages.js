var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var easyimg = require('easyimage');
var sizeOf = require('image-size');

var photosPath = __dirname + '/../images/photos';
var thumbnailsPath = __dirname + '/../images/thumbnails';
var thumbnailSuffixe = '_thumb';

var initImages = function () {
  fs.readdir(photosPath, function(err, files) {
    if(err) {
      return console.error('fail reading images/photos dir');
    }

    _.forEach(files, function(file, key) {
      var fileThumbnailPath = thumbnailsPath + '/' + path.basename(file, '.jpg') + '_thumb';

      fs.readFile(fileThumbnailPath, function(err, fileThumbnail) {
        if(err) {

          if(err.code === 'ENOENT') {
            var dimensions = sizeOf(photosPath + '/' + file);
            var width = 128;
            var height = (dimensions.height / dimensions.width) * width;
            return easyimg.thumbnail({
              src: photosPath + '/' + file,
              dst: fileThumbnailPath + '.jpg',
              width: width,
              height: height,
              quality: 100
            });
          }

          return console.error('Erreur de lecture innatendu pour le fichier : ' + fileThumbnailPath);
        }

      });
    });
  });
};

module.exports = initImages;
