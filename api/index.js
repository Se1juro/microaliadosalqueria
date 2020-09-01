const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config();
require('./database');
//REQUERIMOS LA CONFIGURACION PARA EL SERVIDORS
const config = require('./settings');
const router = require('./router');
const path = require('path');

//CARGAR CONFIGURACION DENTRO DEL SERVIDOR
config(app);
router(app);
app.use(express.static(__dirname + '/frontend'));
app.get('*', function (req, res) {
  const index = path.join(__dirname, 'frontend', 'index.html');
  res.sendFile(index);
});

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

//INICIAMOS SERVIDOR
app.listen(process.env.PORT || port, () => {
  console.log('Server on port ' + port);
});
