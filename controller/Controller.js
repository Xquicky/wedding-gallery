var _ = require('lodash');
var handlebars = require('handlebars');
var fs = require('fs');

var Controller = function Controller(route, method, name) {
  this.route = route;
  this.method = method;
  this.name = name;
};

Controller.prototype.initRoute = function(app) {
  app[this.method](this.route, _.bind(this.control, this));
};

Controller.prototype.specific = function(req, res, callback) { callback(req, res); };

Controller.prototype.render = function(req, res, data) {
  var _this = this;
  fs.readFile(__dirname + '/../front/views/' + this.name + '.html', 'utf-8', function(err, source) {

    if(err) {
      res.writeHeader(200, {'Content-Type': 'text/plain'});
      res.write(err.stack);
      return res.end();
    }

    var template = handlebars.compile(source);
    var customHtml = template(data);

    if(req.query.contentOnly === 'true') {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(customHtml);
      console.timeEnd('Controller ' + _this.name);
      return res.end();
    }
    else {
      console.timeEnd('Controller ' + _this.name);
      return res.render('index', {content: customHtml});
    }
  });
};

Controller.prototype.control = function(req, res) {
  console.time('Controller ' + this.name);
  var data = this.specific(req, res, _.bind(this.render, this));
};

module.exports = Controller;
