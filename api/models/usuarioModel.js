const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    codigo: {
      type: Number,
      minlength: 9,
      maxlength: 9,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    nombre: {
      type: String,
      required: true,
    },
    documentoIdentidad: {
      type: Number,
      required: true,
    },
    estado: {
      type: Boolean,
      required: true,
      default: true,
    },
    departamento: {
      type: String,
      required: true,
    },
    municipio: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Usuario', usuarioSchema);
