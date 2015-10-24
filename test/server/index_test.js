var request = require('supertest')
var routes = require(__server + '/index.js')

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it("Should Respond With JSON", function(done) {

    // Mocha will wait for returned promises to complete
    return request(app)
      .get('/api/questions/random')
      .set('Accept', 'application/json')
      .expect(200,done)
  })
})
