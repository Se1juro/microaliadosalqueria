const inventarioModel = require('../models/inventarioModel');
const productoModel = require('../models/productoModel');
const distribucionModel = require('../models/distribucionModel');
const usuarioModel = require('../models/usuarioModel');
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
    const usuarioCreador = await usuarioModel.findOne({
      codigo: data.codigoUsuario,
    });
    if (!usuarioCreador) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'El usuario no existe',
      });
    }
    if (usuarioCreador.rol !== 'microaliado') {
      return res.status(409).json({
        status: 'Error',
        mensaje:
          'El usuario no tiene el rol requerido para asignarle un inventario',
      });
    }
    const productoExistente = await productoModel.findOne({
      codigoReferencia: data.productos.id,
    });
    if (!productoExistente) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No se encuentra un producto con este codigo de referencia',
      });
    }
    const inventarioExistente = await inventarioModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });

    if (inventarioExistente) {
      for (const key of inventarioExistente.productos) {
        if (key.id === data.productos.id) {
          return res.status(409).json({
            status: 'Error',
            mensaje:
              'Ya tienes un producto de la misma referencia en tu inventario',
          });
        }
      }
      await inventarioModel.findOneAndUpdate(
        { codigoUsuario: data.codigoUsuario },
        {
          $push: {
            productos: data.productos,
          },
        }
      );

      return res.status(200).json({
        status: 'Success',
        message: 'Inventario actualizado',
      });
    } else {
      const inventario = new inventarioModel(data);
      await inventario.save();
      res.status(200).json({
        status: 'Success',
        message: 'Inventario almacenado con exito',
      });
    }
  } catch (error) {
    next(error);
  }
};
inventarioController.eliminarProductoInventario = async (req, res, next) => {
  try {
    const codigoProducto = req.body.codigoProducto;
    let productoExiste = false;
    const inventario = await inventarioModel.findById(req.params.id);
    for (const iterator of inventario.productos) {
      if (iterator.id === codigoProducto) {
        productoExiste = true;
      }
    }
    if (productoExiste === false) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'El producto no se encuentra en tu inventario',
      });
    }
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
    const data = {
      codigoProducto: req.body.codigoProducto,
      cantidad: req.body.cantidad,
    };
    const inventario = await inventarioModel.findOne({
      codigoUsuario: codigoUsuario,
      'productos.id': data.codigoProducto,
    });
    if (!inventario) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No dispone de este producto en su inventario',
      });
    }
    for (const key of inventario.productos) {
      if (key.id === data.codigoProducto) {
        if (key.cantidad < data.cantidad) {
          return res.status(409).json({
            status: 'Error',
            mensaje:
              'No puede eliminar mas cantidad de la que tiene en el stock',
          });
        }
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
inventarioController.aumentarExistencia = async (req, res, next) => {
  try {
    const codigoInventario = req.params.id;
    const data = {
      productos: req.body.productos,
    };
    const inventario = await inventarioModel.findById(codigoInventario);
    if (!inventario) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No se encuentra el inventario',
      });
    } else {
      for (const key of inventario.productos) {
        for (const iterator of data.productos) {
          if (key.id === iterator.id) {
            await inventarioModel.findOneAndUpdate(
              {
                _id: codigoInventario,
                'productos.id': iterator.id,
              },
              {
                $inc: { 'productos.$.cantidad': iterator.cantidad },
              }
            );
            await distribucionModel.findOneAndUpdate(
              {
                codigoInventario: codigoInventario,
                'productos.id': key.id,
              },
              {
                $set: {
                  'productos.$.cantidadInventario':
                    key.cantidad + iterator.cantidad,
                },
              },
              {
                new: true,
              }
            );
          }
        }
      }
      return res.status(200).json({
        status: 'Success',
        mensaje: 'Inventario actualizado con exito',
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = inventarioController;
