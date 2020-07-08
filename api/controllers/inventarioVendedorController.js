const distribucionModel = require('../models/distribucionModel');
const productoModel = require('../models/productoModel');
const inventarioModel = require('../models/inventarioModel');
const inventarioVendedorController = {};
inventarioVendedorController.moveToDistribution = async (req, res, next) => {
  try {
    const data = {
      codigoUsuario: req.body.codigoUsuario,
      productos: req.body.productos,
      horaSalida: Date.now(),
      codigoInventario: req.body.codigoInventario,
    };
    const inventarioOfMicroaliado = await inventarioModel.findOne({
      _id: data.codigoInventario,
      'productos.id': data.productos.id,
    });
    if (!inventarioOfMicroaliado) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No existe inventario para empezar la distribucion',
      });
    }
    //data.productos.cantidadInventario=inventarioOfMicroaliado.productos;
    if (inventarioOfMicroaliado) {
      for (const iterator of inventarioOfMicroaliado.productos) {
        const valorObjeto = Object.values(data.productos);
        if (valorObjeto[0] === iterator.id) {
          data.productos.cantidadInventario = iterator.cantidad;
        }
      }
      await inventarioModel.findOneAndUpdate(
        {
          _id: data.codigoInventario,
          'productos.id': data.productos.id,
        },
        { $inc: { 'productos.$.cantidad': -data.productos.cantidad } }
      );
    }
    const distribucionActiva = await distribucionModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });
    if (distribucionActiva) {
      await distribucionModel.findOneAndUpdate(
        { codigoUsuario: data.codigoUsuario },
        {
          $push: {
            productos: data.productos,
          },
          $set: { cantidadInventario: data.productos.cantidadInventario },
        }
      );
      return res.status(200).json({
        status: 'Success',
        mensaje: 'Se ha añadido el producto a distribucion',
      });
    } else {
      const salidaDistribucion = new distribucionModel(data);
      await salidaDistribucion.save();
      return res.status(200).json({
        status: 'Success',
        mensaje: 'Guardado con exito',
      });
    }
  } catch (error) {
    next(error);
  }
};
inventarioVendedorController.finalizarDistribucion = async (req, res, next) => {
  try {
    const data = {
      codigoUsuario: req.body.codigoUsuario,
      codigoInventario: req.body.codigoInventario,
      productos: req.body.productos,
    };
    const inventario = await inventarioModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });
    const distribucionActual = await distribucionModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });
    for (const key of data.productos) {
      for (const iterator of distribucionActual.productos) {
        if (iterator.id !== key.id) {
          return res.status(409).json({
            status: 'Error',
            mensaje:
              'No puedes devolver un producto que no sacaste a distribucion',
          });
        }
      }
      for (const i of inventario.productos) {
        if (key.cantidad > i.cantidad) {
          return res.status(409).json({
            status: 'Error',
            mensaje:
              'No puedes devolver mas productos de los que habia anteriormente',
          });
        }
      }
      await inventarioModel.findOneAndUpdate(
        {
          codigoUsuario: data.codigoUsuario,
          'productos.id': key.id,
        },
        { $inc: { 'productos.$.cantidad': key.cantidad } }
      );
    }
    return res.status(200).json({
      status: 'Success',
      mensaje: 'Distribucion finalizada',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = inventarioVendedorController;
