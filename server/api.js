module.exports = function(app) {
  app.get('/questions', function (req, res) {
  	res.send('hello world')
  })

  //all episodes (/episodes)
  //all categories (/categories)
  //all finalJeopardy
  //all questions of a certain category (/questions/:category)
  //all questions from an episode (/questions/:episode)
  //all questions with media (/questions/media)
  //all questions without media (/questions/nomedia)
  //all questions from a date range (/questions/date/[object])
}