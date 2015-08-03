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
  fs.readFile(__dirname + '/../front/views/' + this.name + '.html', 'utf-8', function(err, source) {

    if(err) {
      res.writeHeader(200, {'Content-Type': 'text/plain'});
      res.write('404 Not Found\n');
      return response.end();
    }

    var template = handlebars.compile(source);
    var customHtml = template(data);

    console.dir('data');
    console.dir(data);
    console.dir('compilation');
    console.dir(customHtml);

    if(req.query.contentOnly === 'true') {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(customHtml);
      return res.end();
    }
    else {
      return res.render('index', {content: customHtml});
    }
  });
};

Controller.prototype.control = function(req, res) {
  var data = this.specific(req, res, _.bind(this.render, this));
};

module.exports = Controller;
