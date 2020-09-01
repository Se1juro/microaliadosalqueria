const productos = require('./routes/rutasProductos');
const usuarios = require('./routes/rutasUsuarios');
const login = require('./routes/rutasLogin');
const inventario = require('./routes/rutasInventario');
const distribucion = require('./routes/rutasDistribucion');
const contact = require('./routes/rutasContact');
function rutas(app) {
  app.use('/api/productos', productos);
  app.use('/api/usuarios', usuarios);
  app.use('/api/login', login);
  app.use('/api/inventario', inventario);
  app.use('/api/distribucion', distribucion);
  app.use('/api/contact', contact);
}

module.exports = rutas;
