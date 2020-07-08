const productos = require('./routes/rutasProductos');
const usuarios = require('./routes/rutasUsuarios');
const login = require('./routes/rutasLogin');
const inventario = require('./routes/rutasInventario');
const distribucion = require('./routes/rutasDistribucion');
function rutas(app) {
  app.use('/productos', productos);
  app.use('/usuarios', usuarios);
  app.use('/login', login);
  app.use('/inventario', inventario);
  app.use('/distribucion', distribucion);
}

module.exports = rutas;
