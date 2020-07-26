const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config();
require('./database');
//REQUERIMOS LA CONFIGURACION PARA EL SERVIDORS
const config = require('./settings');
const router = require('./router');

//CARGAR CONFIGURACION DENTRO DEL SERVIDOR
config(app);
router(app);
//INICIAMOS SERVIDOR
app.listen(process.env.PORT || port, () => {
  console.log('Server on port ' + port);
});
