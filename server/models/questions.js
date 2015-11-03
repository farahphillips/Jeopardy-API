var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');


var Question = module.exports = createModel('Question', 'questions', {

  

})

// Another custom error
Question.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}
util.inherits(Question.InvalidCredentials, Error)