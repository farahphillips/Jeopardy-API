var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');


var Episodes = module.exports = createModel('Episodes', 'episodeNumbers', {

  

})

// Another custom error
Episodes.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Episodes.InvalidCredentials, Error)