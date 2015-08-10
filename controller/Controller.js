var _ = require('lodash');
var handlebars = require('handlebars');
var fs = require('fs');

var Controller = function Controller(route, method, name, options) {
  this.route = route;
  this.method = method;
  this.name = name;
  this.options = options;
};

Controller.prototype.init = function(app) {
  if(this.options) {
    app[this.method](this.route, this.options, _.bind(this.control, this));
  }
  app[this.method](this.route, _.bind(this.control, this));
};

Controller.prototype.control = function(req, res) {
  console.time('Controller ' + this.name);
  var data = this.specific(req, res, _.bind(this.render, this));
};

Controller.prototype.specific = function(req, res, callback) { callback(req, res); };

Controller.prototype.render = function(req, res, data) {
  var _this = this;
  fs.readFile(__dirname + '/../front/views/' + this.name + '.html', 'utf-8', function(err, source) {

    if(err) {
      res.writeHeader(500, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({status: 500, data: err}));
      console.timeEnd('Controller ' + this.name);
      return res.end();
    }

    if(this.contentOnly === 'true') {
      data = data ? data : {status: 'ok'};
      res.writeHeader(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({status: 200, data: data}));
      console.timeEnd('Controller ' + this.name);
      return res.end();
    }

    var template = handlebars.compile(source);
    var customHtml = template(data);
    console.timeEnd('Controller ' + _this.name);
    return res.render('index', {content: customHtml});
  });
};

module.exports = Controller;
