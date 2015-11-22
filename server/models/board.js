var db = require('../lib/db');
var Promise = require('bluebird');
var createModel = require('../lib/create_model');
var util = require('util');
var Questions = require('./questions')
var Categories = require('./categories');


var Board = module.exports = createModel('Board', null, {
  generateBoardCategories: function() {
    var board = {}, promises = []
    for (var i = 0; i < catIdArray.length; i++) {
      promises.push(Categories.generateWholeCategory(catIdArray[i])
        .then(function(category){
          var len = Object.keys(board).length
          board[len + 1] = category
        }))
    }

    return Promise.all(promises)
    .then(function(){
      return board
    })
    .catch(function(err){
    })
  },

  generateBoard: function() {
    return Categories.getRandomCategories()
    .then(function(categories) {
      return Board.generateBoardCategories(categories)
      .then(function(board) {
        return board
      })
    })
  }

  // generateGame: function() {

  // }

})

// Another custom error
Board.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Board.InvalidCredentials, Error)