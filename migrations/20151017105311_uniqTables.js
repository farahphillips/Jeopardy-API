
exports.up = function(knex, Promise) {

  var questionColumnDrop = knex.raw('alter table "questions" drop "value_id", drop "air_date_id"');

  var questionValueAdd = knex.schema.table('questions', function (table){
    table.integer('value');
  })

  var categoriesDrop = knex.schema.table('categories', function (table) {
    table.dropColumn('category');
  })

  var valuesDrop = knex.schema.dropTable('values');

  var airDatesDrop = knex.schema.dropTable('airDates');

  var episodeNumbersDrop = knex.schema.table('episodeNumbers', function (table) {
    table.dropColumn('episode_number');
  })
  
  var categories = knex.schema.table('categories', function (table) {
    table.string('category').unique();
    table.index(['category']);
  })

  var episodeNumbers = knex.schema.table('episodeNumbers', function (table) {
    table.integer('episode_number').unique();
    table.date('air_date')
    table.index(['episode_number']);
  })
  
  
  return Promise.all([questionColumnDrop, categoriesDrop, questionValueAdd, valuesDrop, airDatesDrop, episodeNumbersDrop,
    categories, episodeNumbers])
  .then(function(){
    console.log("Finished setting up uniqTables migration")
  });

};

exports.down = function(knex, Promise) {

  var removeIndex = knex.raw('DROP INDEX episodenumbers_episode_number_index , "categories_category_index"');

  var values = knex.schema.createTable('values', function (table) {
    table.increments('value_id').primary();
    table.integer('value');
  })

  var airDates = knex.schema.createTable('airDates', function(table) {
    table.increments('air_date_id').primary();
    table.string('air_date');
  })

  var questionsTable = knex.schema.table('questions' , function (table){
    table.dropColumn('value')
    table.integer('value_id').references('value_id').inTable('values');
    table.integer('air_date_id').references('air_date_id').inTable('airDates');
  })

  var episodeNumbersChange = knex.schema.table('episodeNumbers', function (table){
    table.dropColumn('episode_number');
    table.dropColumn('air_date');
  })
  .then(function(){
    return knex.schema.table('episodeNumbers', function (table) {
    table.integer('episode_number');
    })
  })

  var categoriesDrop = knex.schema.table('categories', function (table) {
    table.dropColumn('category');
  })

  var categories = knex.schema.table('categories', function (table) {
    table.string('category');
  })

  return Promise.all([removeIndex, values, airDates ,questionsTable,episodeNumbersChange,categoriesDrop,categories])
  .then(function(){
    console.log("Finished rolling back uniqTables migration.")
  });
  
};
