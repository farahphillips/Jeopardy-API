var Questions = require('./models/questions');
var Episodes = require('./models/episodes');
var Categories = require('./models/categories');
var Board = require('./models/board');
var express = require('express');
var routes = express.Router();


// get a random single question
routes.get('/questions/random', function (req, res) {
  Questions.random().then(function(randQ){
    res.send(randQ)
  })
})

//all episodes (/episodes)
routes.get('/episodes', function (req, res) {
  Episodes.all().then(function(episodes){
    res.send(episodes)
  })
})

//all categories (/categories)
routes.get('/categories', function (req, res) {
  Categories.all().then(function(categories){
    res.send(categories)
  })
})

//random category
routes.get('/categories/random', function (req, res) {
  Categories.random().then(function(randC){
    res.send(randC)
  })
})

//all finalJeopardy
routes.get('/finaljeopardy', function (req, res) {
  Questions.findAllBy('round', 'Final Jeopardy!').then(function(final){
    res.send(final)
  })
})

//all questions of a certain category id (/questions/:id)
routes.get('/questions/category/:id', function (req, res) {
  Questions.findAllBy('category_id', req.params.id).then(function(questions){
    res.send(questions)
  })
})

//all questions from an episode (/questions/:episode)
routes.get('/questions/episode/:id', function (req, res) {
  Questions.findAllBy('episode_number_id', req.params.id).then(function(questions){
    res.send(questions)
  })
})

//generates a whole board of questions (/board)
routes.get('/board', function (req, res) {
  Board.generateBoard().then(function(board){
    res.send(board)
  })
})

//generates a whole game (two rounds & final jeopardy) (/game)


//all questions with media (/questions/media)
//all questions without media (/questions/nomedia)
//all questions from a date range (/questions/date/[object])

module.exports = routes;