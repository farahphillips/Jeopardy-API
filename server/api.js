module.exports = function(app) {

  app.get('/board', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns a board full of questions
      res.json()
    }
  })

  app.get('/board/nomedia', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns a board without media
      res.json()
    }
  })

  app.get('/episodes', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns list of episodes
      res.json()
    }
  })

  app.get('/categories', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns list of categories
      res.json()
    }
  })

  app.get('/final', function (req, res) {
    if (err) {
      console.log('error')
    } else {
     // returns all final jeopardy questions
     res.json()
    }
  })

  app.get('/questions/:category', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns all questions of a specified category
      res.json()
    }
  })

  app.get('/questions/:episode', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns all questions from a specified episode
      res.json()
    }
  })

  app.get('/questions/date/{}', function (req, res) {
    if (err) {
      console.log('error')
    } else {
      // returns all questions from a date range
      res.json()	
    }
  })
}