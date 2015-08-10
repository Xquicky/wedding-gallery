var path = require('path');
var _ = require('lodash');

var Controller = require('../Controller');

var login = new Controller('/login', 'post', path.basename(__filename, '.js'));
login.specific = function(req, res, callback) {
  req.session.user = {
    login: req.body.login,
    rememberMe: req.body.rememberMe
  };
  return res.redirect(302, '/');
};

module.exports = login;
