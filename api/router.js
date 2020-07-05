const productos = require('./routes/rutasProductos');
const usuarios = require('./routes/rutasUsuarios');
const login = require('./routes/rutasLogin');

function rutas(app) {
  app.use('/productos', productos);
  app.use('/usuarios', usuarios);
  app.use('/login', login);
}

module.exports = rutas;
