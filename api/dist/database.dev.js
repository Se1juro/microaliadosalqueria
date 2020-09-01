"use strict";

var mongoose = require('mongoose'); //Libreria de JS que me permite unir Node con MongoDb y crear los esquemas


var URI = process.env.DB_URI; //Ruta de conexion a la BD

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(function () {
  return console.log('DataBase Connect Succesfull');
})["catch"](function (err) {
  return console.log(err + ' Error en la conexion a la BD');
});
module.exports = mongoose;