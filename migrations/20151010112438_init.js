exports.up = function(knex, Promise) {
	
	//Initialize Categories Table
  var categories = knex.schema.createTable('categories', function(table) {
    table.increments('category_id').primary();
    table.string('category');
  })

  //Initialize Values Table
  var values = knex.schema.createTable('values', function(table) {
    table.increments('value_id').primary();
    table.integer('value');
  })

  //Initialize Air Dates Table
  var airDates = knex.schema.createTable('airDates', function(table) {
    table.increments('air_date_id').primary();
    table.string('air_date');
  })

  //Initialize Show Numbers Table
  var episodeNumbers = knex.schema.createTable('episodeNumbers', function(table) {
    table.increments('episode_number_id').primary();
    table.integer('episode_number');
  })

	//Initialize Questions Table
  var questions = knex.schema.createTable('questions', function(table) {
    table.increments('question_id').primary();
    table.string('question');
    table.string('answer');
    table.string('round');
    table.integer('category_id').references('category_id').inTable('categories');
    table.integer('value_id').references('value_id').inTable('values');
    table.integer('air_date_id').references('air_date_id').inTable('airDates');
    table.integer('episode_number_id').references('episode_number_id').inTable('episodeNumbers');
  })

  return Promise.all([categories, values, airDates, episodeNumbers, questions])
  .then(function(){
    console.log("Finished setting up init migration")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions').
  then(function(){
    return knex.schema.dropTable('values')})
  .then(function(){
    return knex.schema.dropTable('airDates')})
  .then(function(){
    return knex.schema.dropTable('episodeNumbers')})
  .then(function(){
    return knex.schema.dropTable('categories')})
  .then(function(){
    console.log("Finished rolling back init migration")
  })
};