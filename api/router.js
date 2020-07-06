const productos = require('./routes/rutasProductos');
const usuarios = require('./routes/rutasUsuarios');
const login = require('./routes/rutasLogin');
const inventario = require('./routes/rutasInventario');
function rutas(app) {
  app.use('/productos', productos);
  app.use('/usuarios', usuarios);
  app.use('/login', login);
  app.use('/inventario', inventario);
}

module.exports = rutas;
