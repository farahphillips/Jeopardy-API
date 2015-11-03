
exports.up = function(knex, Promise) {
  var questionLengthDropUp = knex.schema.table('questions', function (table) {
    table.dropColumn('question');
  })
  var questionLengthUp = knex.schema.table('questions', function (table) {
    table.text('question');
  })

  return Promise.all([questionLengthDropUp,questionLengthUp])
  .then(function(){
    console.log("Finished setting up questionLength migration")
  });
  
};

exports.down = function(knex, Promise) {
  var questionLengthDropDown = knex.schema.table('questions', function (table) {
    table.dropColumn('question');
  })
  var questionLengthDown = knex.schema.table('questions', function (table) {
    table.string('question');
  })
  return Promise.all([questionLengthDropDown,questionLengthDown]).then(function(){
    console.log("Finished rolling back questionLength migration")
  });
};
