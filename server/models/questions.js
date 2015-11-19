var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');


var Question = module.exports = createModel('Question', 'questions', {

  questionsFromCategory: function(catId){
    var result = []

    return Question.findAllBy('category_id', catId)
    .then(function(res) {
      for (var i = 0; i < 5; i++) {
        result.push(res[Math.floor(Math.random() * res.length)])
      }
      return result
    })
  },

  questionsFromMultipleCategories: function(catIdArray){
    var result = [], promises = []

    for (var i = 0; i < catIdArray.length; i++) {
      promises.push(
        Question.questionsFromCategory(catIdArray[i])
        .then(function(res){
          result.push(res)
        })
      )
    }

    return Promise.all(promises)
    .then(function(){
      return result
    })
  }

})

// Another custom error
Question.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Question.InvalidCredentials, Error)