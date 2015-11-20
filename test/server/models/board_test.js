var assert  = require('assert')
var Board = require(__server + '/models/board.js')

describe("Board Model", function() {

  it("generateBoard should an object with six categories, each of which is an object", function(){
    return Board.generateBoard()
      .then(function(board){
        assert.equal(Object.keys(board).length, 6, "should return a board with 6 categories")
      })
  })
})