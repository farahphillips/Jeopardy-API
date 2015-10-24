var db = require('./db.js')
var Promise = require('bluebird')
var util = require('util');
//Temp Fix
var objectAssign = require('object-assign');



module.exports = function (modelName, tablename, extras) {

   // Initialize with methods common across all models
   var Model = {

    all: function () {
      return db(tablename).select('*')
    },

    // Finds a single record by id
    find: function (id) {
      return Model.findBy({ id: id })
    },

    // Finds a single record
    findBy: function (attrs) {
      return db(tablename).select('*').where(attrs).limit(1)
        .then(function(rows) {
          return (rows.length === 0) ? Promise.reject(new Model.NotFound) : rows[0]
        })
    },
    // Returns a random single item
    random: function(){
      return db(tablename).select('*').offset(db.raw('random() * (select count(*) from "'+ tablename+'")')).limit(1)
      .then(function(res){
        // console.log(res)
        return res[0]
      })
    }
  }


  // Custom Errors (useful for handling via Promise#catch)
  Model.NotFound = function NotFound() {
    Error.captureStackTrace(this, this.constructor)
    this.name = 'NotFound'
    this.message = modelName + ': not found.'
  }
  util.inherits(Model.NotFound, Error)


  Model.InvalidArgument = function InvalidArgument(message) {
    Error.captureStackTrace(this, this.constructor)
    this.name = 'InvalidArgument'
    this.message = modelName + ': ' + message
  }
  util.inherits(Model.InvalidArgument, Error)

  // Finally, mix in any extra methods from caller (see next section for an example)
  // return Object.assign(Model, extras)
  //TEMP FIX
  return objectAssign(Model,extras)
}