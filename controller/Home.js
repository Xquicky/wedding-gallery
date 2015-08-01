var path = require('path');
var Controller = require('./Controller');

var Home = new Controller('/', 'get', path.basename(__filename, '.js'));
Home.specific = function() {
  console.log('je passe dans le specific de home');
};

module.exports = Home;
