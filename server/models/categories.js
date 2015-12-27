var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');
var Questions = require('./questions');


var Categories = module.exports = createModel('Categories', 'categories', {

  getCategoryName: function(catId){

    return Categories.findBy({'category_id': catId})
    .then(function(categoryName){
      return categoryName.category
    })
  },

  generateWholeCategory: function(catId,round){
    var category = {}, res;
    return Questions.uniqueQuestions(catId,round)
    .then(function(questions){
      // console.log("QUESTIONS", questions)
      res = questions
      return Categories.getCategoryName(catId).then(function(categoryName){
        return categoryName
      })
    })
    .then(function(categoryName){
      category[categoryName] = res
      return category
    })
  },
  
  //This should take a string that defines what category we should pull questions from.
  // Jeopardy!
  // Double Jeopardy!
  // Final Jeopardy!
  //and return an array of id's that match that round.
  getRandomCategory: function(str){
    return db('questions')
            .distinct('questions.category_id')
            .innerJoin('categories','questions.category_id','categories.category_id')
            .where({'round' : str})
            .then(function(ids){
              //This returns a random cateogry_id from the results of our database querry
              return ids[Math.floor(Math.random() * ids.length)].category_id
            })
    
  }
})

// Another custom error
Categories.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Categories.InvalidCredentials, Error)