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
productoController.getProductByReference = async (req, res, next) => {
  try {
    const id = req.params.id;
    const producto = await productoModel.findById(id);
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
module.exports = productoController;
