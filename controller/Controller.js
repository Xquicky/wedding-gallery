var _ = require('lodash');

var Controller = function Controller(route, method, name) {
  this.route = route;
  this.method = method;
  this.name = name;
};

Controller.prototype.initRoute = function(app) {
  console.dir('initialisation de la route : ' + this.route);
  app[this.method](this.route, _.bind(this.control, this));
};

Controller.prototype.specific = function(req, res) { console.dir('specific par défaut'); };

Controller.prototype.render = function(res) {
  console.dir('rendu');
  res.render(this.name);
};

Controller.prototype.control = function(req, res) {
  console.dir('démarage du control');
  this.specific(req, res);
  this.render(res);
};

module.exports = Controller;
