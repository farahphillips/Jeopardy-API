var browserify = require('browserify-middleware');
var express = require('express');
var routes = express.Router()
var app = express();
var Path = require('path');
var pg = require('pg');
var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var api = require('./api');
var db = require('./lib/db.js');



// Provide a browserified file at a specified path
routes.get('/js/app-bundle.js',
  browserify('./client/app.js'))



// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))



if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })



  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Load API routes
  app.use('/api', api)

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}