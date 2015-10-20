var fs = require('fs');
var pg = require('pg')
var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

fs.readFile( __dirname + "/data.json", "utf8", function(err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log("Loaded file data.json, going to start parsing")
    data = JSON.parse(data)
    insertDb(data)

  }
})

var insertDb = function(data) {
  if (data.length === 0) {
    console.log("All Done")
    process.exit()
  }
  question = data.pop()
  var categoryId = 0,
    valuesId = 0,
    airDateId = 0,
    episodeId = 0;
  return knex('categories').select('category_id').where({
      category: question.category
    })
    .then(function(res) {
      if (res.length === 0) {
        categoryId = false;
      } else {
        categoryId = res[0].category_id
      }
    })
    .then(function() {
      if (!categoryId) {
        return knex('categories').insert({
          category: question.category
        }).returning('category_id')
      }
    })
    .then(function(id) {
      if (!categoryId) {
        categoryId = id[0]
      }
    })
    .then(function() {
      return knex('episodeNumbers').select().where({
        episode_number: parseInt(question.show_number)
      })
    })
    .then(function(res) {
      if (res.length === 0) {
        episodeId = false;
      } else {
        episodeId = res[0].episode_number_id
      }
    })
    .then(function() {
      if (!episodeId) {
        return knex('episodeNumbers').insert({
          episode_number: parseInt(question.show_number),
          air_date: question.air_date
        }).returning('episode_number_id')
      }
    })
    .then(function(id) {
      if (!episodeId) {
        episodeId = id[0]
      }
    })
    .then(function() {
      if (question.value !== null) {
        question.value = parseInt(question.value.slice(1))
      }
      return knex('questions').insert({
        question: question.question,
        answer: question.answer,
        round: question.round,
        category_id: categoryId,
        value: question.value,
        episode_number_id: episodeId
      })
    })
    .then(function() {
      insertDb(data)
    })
    .catch(function(err) {
      console.log(question)
      console.error(err);
    })
}
