var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');


var Categories = module.exports = createModel('Categories', 'categories', {

  length: function(){
    return db('categories').count('category_id')
    .then(function(num){
      return num[0].count
    })
  },
  
  randomCategories: function(num){
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
  }
})

// Another custom error
Categories.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Categories.InvalidCredentials, Error)