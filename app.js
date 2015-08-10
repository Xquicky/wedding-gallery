var engines = require('consolidate');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');

var initControllers = require('./setup/initControllers');
var initImages = require('./setup/initImages');

var app = express();

app.engine('.html', engines.handlebars);
app.set('view engine', 'html');
app.set("view options", { layout: true });
app.set('views', __dirname + '/front/views');

// static resources
app.use('/front', express.static(__dirname + '/front'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/images', express.static(__dirname + '/images'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  genid: uuid.v4,
  secret: 'wedding',
  resave: false,
  saveUninitialized: false
}));

// init controller
initControllers(app);

//init images
initImages();

// run server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Wedding app listening at http://%s:%s', host, port);
});
