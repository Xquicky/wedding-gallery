var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var handlebars = require('handlebars');
var Controller = require('../Controller');

var connexion = new Controller('/connexion', 'get', path.basename(__filename, '.js'));

module.exports = connexion;
