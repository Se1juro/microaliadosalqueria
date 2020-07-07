const inventarioModel = require('../models/inventarioModel');
const productoModel = require('../models/productoModel');
const inventarioController = {};

inventarioController.getInventarioByUser = async (req, res, next) => {
  try {
    const codigoUsuario = req.params.id;
    const inventario = await inventarioModel.find({
      codigoUsuario: codigoUsuario,
    });
    const mapProducts = inventario[0].productos;
    const productosArray = [];
    mapProducts.forEach((element) => {
      productosArray.push(element.id);
    });
    const productsInInventory = await productoModel
      .find()
      .where('codigoReferencia')
      .in(productosArray)
      .exec();
    return res.status(200).json({ inventario, productsInInventory });
  } catch (error) {
    next(error);
  }
};
inventarioController.crearInventario = async (req, res, next) => {
  try {
    const data = {
      codigoUsuario: req.body.codigoUsuario,
      productos: req.body.productos,
    };
    const inventarioExistente = await inventarioModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });
    if (inventarioExistente) {
      const resultado = await inventarioModel.findOneAndUpdate(
        { codigoUsuario: data.codigoUsuario },
        {
          $push: {
            productos: data.productos,
          },
        }
      );
      return res.status(200).json({
        resultado,
        status: 'Success',
        message: 'Inventario actualizado',
      });
    } else {
      const inventario = new inventarioModel(data);
      const resultado = await inventario.save();
      res.status(200).json({
        status: 'Success',
        message: 'Inventario almacenado con exito',
        resultado,
      });
    }
  } catch (error) {
    next(error);
  }
};
inventarioController.eliminarProductoInventario = async (req, res, next) => {
  try {
    const codigoProducto = req.body.codigoProducto;
    const inventario = await inventarioModel.findById(req.params.id);
    const productosToEliminar = await inventarioModel.findOneAndUpdate(
      { _id: inventario._id },
      { $pull: { productos: { id: codigoProducto } } }
    );
    return res.json({
      productosToEliminar,
      status: 'Success',
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    next(error);
  }
};
inventarioController.restarCantidadProducto = async (req, res, next) => {
  try {
    const codigoUsuario = req.params.id;
    let nuevaCantidad = 0;
    const data = {
      codigoProducto: req.body.codigoProducto,
      cantidad: req.body.cantidad,
    };
    const inventario = await inventarioModel.findOne({
      codigoUsuario: codigoUsuario,
    });
    console.log(data);
    for (const key of inventario.productos) {
      console.log(key.id);
      if (data.codigoProducto === key.id) {
        nuevaCantidad = key.cantidad - data.cantidad;
        console.log(nuevaCantidad);
      }
    }
    const resultado = await inventarioModel.findOneAndUpdate(
      {
        codigoUsuario: codigoUsuario,
        'productos.id': data.codigoProducto,
      },
      { $inc: { 'productos.$.cantidad': -data.cantidad } }
    );
    res.status(200).json({
      status: 'Success',
      mensaje: 'Se ha restado a la cantidad del producto en tu inventario',
      resultado,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = inventarioController;
