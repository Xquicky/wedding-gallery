var engines = require('consolidate')
var express = require('express');
var app = express();

app.engine('.html', engines.handlebars);
app.set('view engine', 'html');
app.set("view options", { layout: true });

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.render('main');
});

var server = app.listen(2368, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
