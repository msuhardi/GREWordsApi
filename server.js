var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Group = require('./api/models/GREWordsModel'),
  bodyParser = require('body-parser');

// Find an appropriate database to connect to, defaulting to localhost if we don't find one.
var uristring =
  process.env.MONGODB_URI ||
  'mongodb://localhost/GREWordsdb';

mongoose.Promise = global.Promise;
mongoose.connect(uristring);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/GREWordsRoutes');
routes(app);


app.listen(port);

console.log('GRE Words RESTful API server started on: ' + port);
