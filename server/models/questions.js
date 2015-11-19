var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');


var Questions = module.exports = createModel('Questions', 'questions', {

  uniqueQuestions: function(catId){
    var result = {}

    return Questions.findAllBy('category_id', catId)
    .then(function(res) {
      // if there are only 5 questions in the category,
      // they are unique & should be returned
      if (res.length === 5) {
        // for-loop parses the res array,
        // & inserts into an empty object
        for (var i = 0; i < 5; i++) {
          result[i+1] = res[i]
        }

        return result

      } else {
      // else: there are less than or more than 5 questions in the category
        while (Object.keys(result).length < 5) {
          // checks that the new result object is less than 5
          // the result object will only return once there are 5 unique questions

          var question = res[Math.floor(Math.random() * res.length)]

          var bool = false;
          
          // the following for-in loop checks for the question's uniqueness
          for (var key in result) {
            if (result[key] === question) {
              bool = true;
            }
          }
      
          // the question is inserted into the result object as long as it is unique
          if (!bool) result[Object.keys(result).length + 1] = question
        }
        
        return result
      }
    })
  }

})

// Another custom error
Questions.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Questions.InvalidCredentials, Error)