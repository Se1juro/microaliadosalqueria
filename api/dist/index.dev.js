"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 4000;

require('dotenv').config();

require('./database'); //REQUERIMOS LA CONFIGURACION PARA EL SERVIDORS


var config = require('./settings');

var router = require('./router');

var path = require('path'); //CARGAR CONFIGURACION DENTRO DEL SERVIDOR


config(app);
router(app);
app.use(express["static"](__dirname + '/frontend'));
app.get('*', function (req, res) {
  var index = path.join(__dirname, 'frontend', 'index.html');
  res.sendFile(index);
});
if (process.env.NODE_ENV !== 'production') require('dotenv').config(); //INICIAMOS SERVIDOR

app.listen(process.env.PORT || port, function () {
  console.log('Server on port ' + port);
});