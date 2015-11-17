var request = require('supertest')
var assert  = require('assert')
var routes = require(__server + '/index.js')

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it("GET /api/questions/random responds with a random question", function(done) {
    return request(app)
      .get('/api/questions/random')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(response) {
        var res = response.body
        assert.equal(typeof res.question, "string", "question should defined");
        assert.equal(typeof res.answer, "string", "answer should defined");
        assert.equal(typeof res.value, "number", "number should defined");
      })
      .end(done)
  })

  it("GET /api/episodes responds with all episode numbers", function(done) {
    return request(app)
      .get('/api/episodes')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(response) {
        var res = response.body
        for (var i=0; i < res.length; i++) {
          assert.equal(typeof res[i].episode_number, "string", "episode_number should be defined");
        }
      })
      .end(done)
  })
})
