var assert  = require('assert')
var Categories = require(__server + '/models/categories.js')

describe("Categories Model", function() {

  it("getCategoryName should return a string that is 'HISTORIC NAMES'", function(){
    var catId = 1

    return Categories.getCategoryName(catId)
      .then(function(name){
        assert.equal(name, "HISTORIC NAMES", "should return the category name 'HISTORIC NAMES'")
      })
  })

  it('generateWholeCategory returns an object with a category name that contains another object', function(){
    var catId = 1

    return Categories.generateWholeCategory(catId)
      .then(function(category){
        var categoryName = Object.keys(category)[0]

        assert.equal(Object.keys(category).length, 1, "should return 1")
        assert.equal(categoryName, 'HISTORIC NAMES', "should return 'HISTORIC NAMES' as a key")
        assert.equal(typeof category[categoryName], "object", "should return an object")
        
        var questionsObj = category[categoryName]

        assert.equal(Object.keys(questionsObj).length, 5, "should return 5")

      })
  })
  
  it("getRandomCategoryId should return a category id from a round that is from 'Jeopardy!' round ", function(){
    var question
    return Categories.getRandomCategory("Jeopardy!")
      .then(function(category){
        assert.equal(typeof category,"number", "should be a single number")
        return Categories.generateWholeCategory(category,"Jeopardy!")
        })
      .then(function(questions){
        var catName = Object.keys(questions)[0]
        assert.equal(typeof catName, "string", "should return a category")
        assert.equal(Object.keys(questions[catName]).length, 5, "should have 5 questions")
        for(var keys in questions[catName]){
          assert.equal(questions[catName][keys].round, "Jeopardy!", "should be from Jeopardy! round.")
        } 
        })
  })
  
  it("getRandomCategory should return a category id of a round that is from 'Double Jeopardy!' round ", function(){
    var question
    return Categories.getRandomCategory("Double Jeopardy!")
      .then(function(category){
        assert.equal(typeof category,"number", "should be a single number")
        return Categories.generateWholeCategory(category,"Double Jeopardy!")
        })
      .then(function(questions){
        var catName = Object.keys(questions)[0]
        assert.equal(typeof catName, "string", "should return a category")
        assert.equal(Object.keys(questions[catName]).length, 5, "should have 5 questions")
        for(var keys in questions[catName]){
          // console.log(questions[catName][keys])
          assert.equal(questions[catName][keys].round, "Double Jeopardy!", "should be from Jeopardy! round.")
        } 
        })
  })
  
  it("getRandomCategoryId should return a id of a round that is from 'Final Jeopardy!' round ", function(){
    var question
    return Categories.getRandomCategory("Final Jeopardy!")
      .then(function(category){
        assert.equal(typeof category,"number", "should be a single number")
        return Categories.generateWholeCategory(category,"Final Jeopardy!")
        })
      .then(function(questions){
        var catName = Object.keys(questions)[0]
        assert.equal(typeof catName, "string", "should return a category")
        assert.equal(Object.keys(questions[catName]).length, 1, "should have 1 question")
        for(var keys in questions[catName]){
          assert.equal(questions[catName][keys].round, "Final Jeopardy!", "should be from Jeopardy! round.")
        } 
        })
  })
})