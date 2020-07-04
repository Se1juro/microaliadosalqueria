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
      type: String,
      required: true,
      enum: ['si', 'no'],
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Producto', productSchema);
