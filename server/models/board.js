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

  generateFirstRound: function() {
    var round = {}, prom = [],catids = [];
    for(var i = 0; i < 6; i++){
      prom.push(Categories.getRandomCategory("Jeopardy!")
        .then(function(cat){
          catids.push(cat)
      }))
    }
    
    return Promise.all(prom)
    .then(function(){
      var promises = catids.map(function(id){
                  return Categories.generateWholeCategory(id,"Jeopardy!")
                         .then(function(cat){
                            round[Object.keys(cat)[0]] = cat[Object.keys(cat)[0]];
                            })
                          })
      return Promise.all(promises)
      .then(function(){
        return round
      })
    }) 
  },
  
   generateSecondRound: function() {
    var round = {}, prom = [],catids = [];
    for(var i = 0; i < 6; i++){
      prom.push(Categories.getRandomCategory("Double Jeopardy!")
        .then(function(cat){
          catids.push(cat)
      }))
    }
    
    return Promise.all(prom)
    .then(function(){
      var promises = catids.map(function(id){
                  return Categories.generateWholeCategory(id,"Double Jeopardy!")
                         .then(function(cat){
                            round[Object.keys(cat)[0]] = cat[Object.keys(cat)[0]];
                            })
                          })
      return Promise.all(promises)
      .then(function(){
        return round
      })
    }) 
  },
  
   generateFinalRound: function() {
    var round = {}, prom = [],catids = [];
      prom.push(Categories.getRandomCategory("Final Jeopardy!")
        .then(function(cat){
          catids.push(cat)
      }))
    
    return Promise.all(prom)
    .then(function(){
      var promises = catids.map(function(id){
                  return Categories.generateWholeCategory(id,"Final Jeopardy!")
                         .then(function(cat){
                            round[Object.keys(cat)[0]] = cat[Object.keys(cat)[0]];
                            })
                          })
      return Promise.all(promises)
      .then(function(){
        return round
      })
    }) 
  },
  
  generateBoard: function() {
    var board = {}
    return Board.generateFirstRound()
           .then(function(firstRound){
             board["Round One"] = firstRound
           })
           .then(Board.generateSecondRound)
           .then(function(secondRound){
             board["Round Two"] = secondRound
           })
           .then(Board.generateFinalRound)
           .then(function(finalRound){
             board["Final Round"] = finalRound
             return board
           })
  }

})

// Another custom error
Board.InvalidCredentials = function InvalidCredentials() {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'InvalidCredentials'
  this.message = modelName + ': not found.'
}

util.inherits(Board.InvalidCredentials, Error)