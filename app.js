var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var config = require('./config'); // get our config file

var app = express();

app.set('superSecret', config.secret); // secret variable 
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);

var server = app.listen(8000, function() {
	  console.log('Server listening on port ' + server.address().port);
});
