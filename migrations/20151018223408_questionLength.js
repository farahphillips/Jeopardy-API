
exports.up = function(knex, Promise) {
  var questionLengthDropUp = knex.schema.table('questions', function (table) {
    table.dropColumn('question');
  })
  var questionLengthUp = knex.schema.table('questions', function (table) {
    table.text('question');
  })
  console.log("Finished setting up the database")
  return Promise.all([questionLengthDropUp,questionLengthUp]);
  
};

exports.down = function(knex, Promise) {
  var questionLengthDropDown = knex.schema.table('questions', function (table) {
    table.dropColumn('question');
  })
  var questionLengthDown = knex.schema.table('questions', function (table) {
    table.string('question');
  })
  console.log("Finished setting up the database")
  return Promise.all([questionLengthDropDown,questionLengthDown]);
};
