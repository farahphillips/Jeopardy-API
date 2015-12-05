var assert  = require('assert')
var Board = require(__server + '/models/board.js')

describe("Board Model", function() {

  it("generateFirstRound should return an object with six categories, each of which is an object", function(){
    return Board.generateFirstRound()
      .then(function(board){
        assert.equal(Object.keys(board).length, 6, "should return a board with 6 categories")
      })
  })
  
  it("generateSecondRound should return an object with six categories, each of which is an object", function(){
    return Board.generateSecondRound()
      .then(function(board){
        assert.equal(Object.keys(board).length, 6, "should return a board with 6 categories")
      })
  })
  
  it("generateFinalRound should return an object with six categories, each of which is an object", function(){
    return Board.generateFinalRound()
      .then(function(board){
        assert.equal(Object.keys(board).length, 1, "should return a board with 1 categories")
      })
  })
  
  it("generateBoard should return an object with 3 categories, each of which is an object", function(){
    return Board.generateBoard()
      .then(function(board){
        console.log(board)
        assert.equal(Object.keys(board).length, 3, "should return a board with 1 categories")
      })
  })
})