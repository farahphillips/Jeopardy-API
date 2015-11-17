var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');


var Categories = module.exports = createModel('Categories', 'categories', {

  

})

// Another custom error
Categories.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Categories.InvalidCredentials, Error)