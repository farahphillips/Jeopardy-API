
exports.up = function(knex, Promise) {

  var categoriesDrop = knex.schema.table('categories', function (table) {
    table.dropColumn('category');
  })

  var valuesDrop = knex.schema.table('values', function (table) {
    table.dropColumn('value');
  })

  var airDatesDrop = knex.schema.table('airDates', function (table) {
    table.dropColumn('air_date');
  })

  var episodeNumbersDrop = knex.schema.table('episodeNumbers', function (table) {
    table.dropColumn('episode_number');
  })
  
  var categories = knex.schema.table('categories', function (table) {
    table.string('category').unique();
    table.index(['category']);
  })

  var values = knex.schema.table('values', function (table) {
    table.string('value').unique();
    table.index(['value']);
  })

  var airDates = knex.schema.table('airDates', function (table) {
    table.string('air_date').unique();
    table.index(['air_date']);
  })

  var episodeNumbers = knex.schema.table('episodeNumbers', function (table) {
    table.string('episode_number').unique();
    table.index(['episode_number']);
  })
  
  console.log("Finished setting up the database")
  return Promise.all([categoriesDrop, valuesDrop, airDatesDrop, episodeNumbersDrop,
    categories, values, airDates, episodeNumbers]);

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
