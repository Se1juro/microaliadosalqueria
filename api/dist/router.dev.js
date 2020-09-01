"use strict";

var productos = require('./routes/rutasProductos');

var usuarios = require('./routes/rutasUsuarios');

var login = require('./routes/rutasLogin');

var inventario = require('./routes/rutasInventario');

var distribucion = require('./routes/rutasDistribucion');

var contact = require('./routes/rutasContact');

function rutas(app) {
  app.use('/api/productos', productos);
  app.use('/api/usuarios', usuarios);
  app.use('/api/login', login);
  app.use('/api/inventario', inventario);
  app.use('/api/distribucion', distribucion);
  app.use('/api/contact', contact);
}

module.exports = rutas;