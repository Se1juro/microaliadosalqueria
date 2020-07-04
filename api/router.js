const productos = require('./routes/rutasProductos');

function rutas(app) {
  app.use('/productos', productos);
}

module.exports = rutas;
