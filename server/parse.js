var fs = require('fs');
var pg = require('pg')
var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

fs.readFile("./data.json", "utf8", function(err,data){
  if(err){
    console.error(err)
  }else{
    data = JSON.parse(data)
    insertDb(data).then(function(){
      if(data.length === 0){
        console.log("Data Empty")
      }else{
        console.log("Something")
        insertDb(data)
      }
    })
      
  }
})

var insertDb = function(data){
  question = data.pop()
  var categoryId = 0, valuesId = 0, airDateId = 0, episodeId = 0;
       return knex('categories').select().where({category:question.category})
      .then(function(res){
        if(res.length === 0){
          console.log("INSIDE HERE");
          knex('categories').insert({category:question.category})
          .then(function(res){
            console.log(res)
            categoryId = res[0]
          })
          .catch(function(err) {
            console.error(err);
          })
        }else{
          console.log(res)
          categoryId = res[0].category_id
        }
      })
      .catch(function(err) {
            console.error(err);
          })

}