'use strict';

// Get requirements
var express = require('express');
var routes = require('./app/routes.js');

// Set up for running
var port = process.env.PORT || 8080;

var app = express();

app.use(express.static(__dirname + '/public'));

routes(app);

// Listen
app.listen(port, function () {
  console.log('App listening on port', port);
});