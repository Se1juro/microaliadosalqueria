const productos = require('./routes/rutasProductos');
const usuarios = require('./routes/rutasUsuarios');
const login = require('./routes/rutasLogin');
const inventario = require('./routes/rutasInventario');
const distribucion = require('./routes/rutasDistribucion');
const contact = require('./routes/rutasContact');
function rutas(app) {
  app.use('/productos', productos);
  app.use('/usuarios', usuarios);
  app.use('/login', login);
  app.use('/inventario', inventario);
  app.use('/distribucion', distribucion);
  app.use('/contact', contact);
}

module.exports = rutas;
