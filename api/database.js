const mongoose = require('mongoose'); //Libreria de JS que me permite unir Node con MongoDb y crear los esquemas

const URI = process.env.DB_URI; //Ruta de conexion a la BD
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log('DataBase Connect Succesfull'))
  .catch((err) => console.log(err + ' Error en la conexion a la BD'));

module.exports = mongoose;
