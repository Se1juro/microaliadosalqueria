const productoModel = require('../models/productoModel');
const productoController = {};

productoController.getAllProducts = async (req, res, next) => {
  try {
    const productos = await productoModel.find();
    return res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};
productoController.getProductsActive = async (req, res, next) => {
  try {
    const productos = await productoModel.find({ estado: true });
    return res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};
productoController.getProductByReference = async (req, res, next) => {
  try {
    const codigoReferencia = req.params.id;
    const producto = await productoModel.find({
      codigoReferencia: codigoReferencia,
    });
    if (!producto) {
      return res.status(409).json({
        status: 'Error',
        message: 'El producto no existe, comuniquese con el administrador',
      });
    }
    return res.status(200).json(producto);
  } catch (err) {
    next(err);
  }
};
productoController.crearProducto = async (req, res, next) => {
  try {
    const data = {
      codigoReferencia: req.body.codigoReferencia,
      descripcion: req.body.descripcion,
      aplicaIva: req.body.iva,
      precioUnitario: req.body.precioUnitario,
      cantidad: req.body.cantidad,
    };
    const producto = new productoModel(data);
    const resultado = await producto.save();
    res.status(200).json({
      status: 'Success',
      message: 'Producto insertado correctamente',
    });
  } catch (err) {
    next(err);
  }
};
productoController.editarProductoByReference = async (req, res, next) => {
  try {
    const codigoReferencia = req.params.id;
    const data = {
      descripcion: req.body.descripcion,
      aplicaIva: req.body.iva,
      precioUnitario: req.body.precioUnitario,
      cantidad: req.body.cantidad,
    };
    const productoActualizado = await productoModel.findOneAndUpdate(
      { codigoReferencia: codigoReferencia },
      { $set: data },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Producto Actualizado con exito',
    });
  } catch (error) {
    next(error);
  }
};
productoController.eliminarProductoByReference = async (req, res, next) => {
  try {
    const codigoReferencia = req.params.id;
    const resultado = await productoModel.findOneAndUpdate(
      { codigoReferencia: codigoReferencia },
      { estado: false },
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Producto eliminado con exito',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = productoController;
