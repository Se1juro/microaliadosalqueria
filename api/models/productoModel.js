const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    codigoReferencia: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    aplicaIva: {
      type: Boolean,
      required: true,
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    estado: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Producto', productSchema);
