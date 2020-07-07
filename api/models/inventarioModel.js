const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventarioSchema = new Schema({
  productos: {
    type: Array,
    required: true,
  },
  codigoUsuario: {
    type: Number,
    minlength: 9,
    maxlength: 9,
    required: true,
  },
});
module.exports = mongoose.model('Inventario', inventarioSchema);
