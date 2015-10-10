exports.up = function(knex, Promise) {
	
	//Initialize Categories Table
  var categories = knex.schema.createTable('categories', function(table) {
    table.increments('category_id').primary();
    table.string('category');
    console.log("Created Categories Table");
  })

  //Initialize Values Table
  var values = knex.schema.createTable('values', function(table) {
    table.increments('value_id').primary();
    table.integer('value');
    console.log("Created Values Table");
  })

  //Initialize Air Dates Table
  var airDates = knex.schema.createTable('airDates', function(table) {
    table.increments('air_date_id').primary();
    table.string('air_date');
    console.log("Created Air Dates Table");
  })

  //Initialize Show Numbers Table
  var episodeNumbers = knex.schema.createTable('episodeNumbers', function(table) {
    table.increments('episode_number_id').primary();
    table.integer('episode_number');
    console.log("Created Episode Numbers Table");
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
    console.log('Created Questions Table');
  })

  console.log("Finished setting up the database")
  return Promise.all([categories, values, airDates, episodeNumbers, questions]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('categories').dropTable('values').dropTable('airDates').dropTable('episodeNumbers').dropTable('questions')
};