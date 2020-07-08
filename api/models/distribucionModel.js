const mongoose = require('mongoose');
const { Schema } = mongoose;
const distribucionSchema = new Schema({
  codigoUsuario: {
    type: Number,
    minlength: 9,
    maxlength: 9,
    required: true,
  },
  codigoInventario: {
    type: String,
    required: true,
  },
  productos: {
    type: Array,
    required: true,
  },
  horaSalida: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model('Distribucion', distribucionSchema);
