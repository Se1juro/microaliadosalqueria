const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
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
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Producto', productSchema);
