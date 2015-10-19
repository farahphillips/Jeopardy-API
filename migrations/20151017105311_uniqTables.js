
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
    table.string('episode_number').unique();
    table.date('air_date')
    table.index(['episode_number']);
  })
  
  console.log("Finished setting up the database")
  return Promise.all([questionColumnDrop, categoriesDrop, questionValueAdd, valuesDrop, airDatesDrop, episodeNumbersDrop,
    categories, episodeNumbers]);

};

exports.down = function(knex, Promise) {

  var categories = knex.schema.table('categories', function (table) {
    table.dropColumn('category')
    table.string('category');
  })

  var values = knex.schema.table('values', function (table) {
    table.dropColumn('value')
    table.integer('value');
  })

  var airDates = knex.schema.table('airDates', function (table) {
    table.string('air_date');
    table.uniq.index.string('air_date')
  })

  var episodeNumbers = knex.schema.table('episodeNumbers', function (table) {
    table.dropColumn('episode_number')
    table.integer('episode_number');
  })
  
  console.log("Finished setting up the database")
  return Promise.all([categories, values, airDates, episodeNumbers]);
  
};
