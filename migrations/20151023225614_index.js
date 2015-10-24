
exports.up = function(knex, Promise) {
  
  var categoryIndex = knex.raw('CREATE UNIQUE INDEX category_index ON "categories" (category)');

  var episodeNumberIndex = knex.raw('CREATE UNIQUE INDEX episode_index ON "episodeNumbers" (episode_number)');

  return Promise.all([categoryIndex,episodeNumberIndex])
  .then(function(){
    console.log("Finished setting up index migration")
  });

};

exports.down = function(knex, Promise) {

  var categoryIndexRemove = knex.raw('DEOP INDEX "category_index"');

  var episodeNumberIndexRemove = knex.raw('DROP INDEX "episode_index"');

  return Promise.all([categoryIndexRemove, episodeNumberIndexRemove])
  .then(function(){
    console.log("Finished setting removing index migration")
  });
  
};
