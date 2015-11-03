var fs      = require('fs')
var path    = require('path')
var Promise = require('bluebird');
var knex    = require('knex')

// Read configuration file
var config = require('../../knexfile.js')

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development'
var db = require('knex')(config[env]);
db.migrate.latest([config]);

// Export the db object, which will be able to make database connections
module.exports = db

// Function for your testing suite
knex.deleteEverything = function () {
  if (env !== 'test') return Promise.reject();
  // TODO: Delete data from all tables (useful for testing)
  // return db('users').truncate()
}