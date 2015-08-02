var path = require('path');
var Controller = require('./Controller');

var Home = new Controller('/home', 'get', path.basename(__filename, '.js'));
Home.specific = function() {
  return {name : 'bidule'};
};

module.exports = Home;
