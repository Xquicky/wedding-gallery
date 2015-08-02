var engines = require('consolidate');
var express = require('express');
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

// init controller
initControllers(app);

//init images
initImages();

app.get('/', function(req, res) { res.render('index'); });

// run server
var server = app.listen(2368, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
