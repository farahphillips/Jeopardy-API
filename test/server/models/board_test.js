var assert  = require('assert')
var Board = require(__server + '/models/board.js')

describe("Board Model", function() {

  it("generateBoard should an object with six categories, each of which is an object", function(){
    var catIdArray = [1,2,3,4,5]

    return Board.generateBoard(catIdArray)
      .then(function(board){
        assert.equal(Object.keys(board).length, 5, "should return an object with 5 keys")
      })
  })
})