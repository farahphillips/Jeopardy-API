var browserify = require('browserify-middleware')
var express = require('express')
var app = express()
var Path = require('path')
var pg = require('pg')
var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);
var api = require('./api')

knex.migrate.latest([config]);

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'))

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))

app.use('/', api)

app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
