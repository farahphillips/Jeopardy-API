var assert  = require('assert')
var Questions = require(__server + '/models/questions.js')

describe("Questions Model", function() {

  it('uniqueQuestions returns five unique questions from the same category', function(){
    var catId = 10

    return Questions.uniqueQuestions(catId)
      .then(function(questions){
        assert.equal(Object.keys(questions).length, 5)
        for (var key in questions) {
          assert.equal(typeof questions[key].question, "string")
          assert.equal(typeof questions[key].answer, "string")
          assert.equal(typeof questions[key].question_id, "number")
          assert.equal(typeof questions[key].round, "string")
          assert.equal(questions[key].category_id, catId)
        }
      })
  })
})