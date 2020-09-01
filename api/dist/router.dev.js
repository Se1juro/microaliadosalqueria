"use strict";

var productos = require('./routes/rutasProductos');

var usuarios = require('./routes/rutasUsuarios');

var login = require('./routes/rutasLogin');

var inventario = require('./routes/rutasInventario');

var distribucion = require('./routes/rutasDistribucion');

var contact = require('./routes/rutasContact');

function rutas(app) {
  app.use('/productos', productos);
  app.use('/usuarios', usuarios);
  app.use('/login', login);
  app.use('/inventario', inventario);
  app.use('/distribucion', distribucion);
  app.use('/contact', contact);
}

module.exports = rutas;