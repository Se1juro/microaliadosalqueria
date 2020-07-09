const distribucionModel = require('../models/distribucionModel');
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
    });
    if (!inventarioOfMicroaliado) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No existe inventario para empezar la distribucion',
      });
    } else {
      let valorObjeto;
      let cantidadInventario;
      for (const iterator of inventarioOfMicroaliado.productos) {
        valorObjeto = Object.values(data.productos);
        if (valorObjeto[0] === iterator.id) {
          data.productos.cantidadInventario = iterator.cantidad;
        }
      }
      const distribucionActiva = await distribucionModel.findOne({
        codigoUsuario: data.codigoUsuario,
      });
      const newInventario = await inventarioModel.findById(
        data.codigoInventario
      );
      let idDistribucion;
      if (distribucionActiva) {
        for (const uwu of newInventario.productos) {
          if (uwu.id === data.productos.id) {
            cantidadInventario = uwu.cantidad;
          }
        }
        if (cantidadInventario === undefined || cantidadInventario === 0) {
          return res.status(409).json({
            status: 'Error',
            mensaje:
              'Al parecer el producto no esta en el inventario o no tiene sotck',
          });
        }
        for (const product of distribucionActiva.productos) {
          idDistribucion = product.id;
        }
        if (idDistribucion === data.productos.id) {
          console.log('Hola');
          await distribucionModel.findOneAndUpdate(
            {
              codigoInventario: data.codigoInventario,
              'productos.id': data.productos.id,
            },
            {
              $set: {
                'productos.$.cantidadInventario':
                  cantidadInventario - data.productos.cantidad,
              },
              $inc: { 'productos.$.cantidad': data.productos.cantidad },
            },
            {
              new: true,
            }
          );
          await inventarioModel.findOneAndUpdate(
            {
              _id: data.codigoInventario,
              'productos.id': data.productos.id,
            },
            { $inc: { 'productos.$.cantidad': -data.productos.cantidad } }
          );
          return res.status(200).json({
            status: 'Success',
            mensaje: 'Distribucion actualizada',
          });
        } else {
          await distribucionModel.findOneAndUpdate(
            {
              codigoInventario: data.codigoInventario,
            },
            {
              $push: {
                productos: data.productos,
              },
            }
          );
          return res.status(200).json({
            status: 'Success',
            mensaje: 'Distribucion actualizada',
          });
        }
      } else {
        const salidaDistribucion = new distribucionModel(data);
        await salidaDistribucion.save();
        return res.status(200).json({
          status: 'Success',
          mensaje: 'Guardado con exito',
        });
      }
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
        if (key.id === iterator.id) {
          for (const i of inventario.productos) {
            if (i.id === key.id) {
              let cantidadExcepcion = i.cantidad + key.cantidad;
              if (cantidadExcepcion > iterator.cantidadInventario) {
                return res.status(409).json({
                  status: 'Error',
                  mensaje: 'Ya devolviste estos productos',
                });
              }
            }
          }
        }
        if (iterator.id === key.id) {
          await inventarioModel.findOneAndUpdate(
            {
              codigoUsuario: data.codigoUsuario,
              'productos.id': key.id,
            },
            { $inc: { 'productos.$.cantidad': key.cantidad } }
          );
          return res.status(200).json({
            status: 'Success',
            mensaje: 'Distribucion finalizada',
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports = inventarioVendedorController;
