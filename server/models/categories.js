var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');
var Questions = require('./questions');


var Categories = module.exports = createModel('Categories', 'categories', {

  length: function(){
    return db('categories').count('category_id')
    .then(function(num){
      return num[0].count
    })
  },
  
  getRandomCategories: function(num){
    var res = []
    num = num || 6

    return Categories.length().then(function(len){
      for (var i = 0; i < num; i++) {
        res.push(Math.ceil(Math.random() * len))
      }
    })
    .then(function(){
      return res
    })
  },

  getCategoryName: function(catId){

    return Categories.findBy({'category_id': catId})
    .then(function(categoryName){
      return categoryName.category
    })
  },

  generateWholeCategory: function(catId){
    var category = {}, res;

    return Questions.uniqueQuestions(catId)
    .then(function(questions){
      res = questions
      return Categories.getCategoryName(catId).then(function(categoryName){
        return categoryName
      })
    })
    .then(function(categoryName){
      category[categoryName] = res
      return category
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