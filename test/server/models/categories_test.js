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
})