const distribucionModel = require('../models/distribucionModel');
const inventarioModel = require('../models/inventarioModel');
const usuarioModel = require('../models/usuarioModel');
const { model } = require('../models/distribucionModel');
const inventarioVendedorController = {};
inventarioVendedorController.moveToDistribution = async (req, res, next) => {
  try {
    let canMoveToDistribucion = false;
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
        mensaje: 'El inventario no existe',
      });
    }
    for (const iterator of inventarioOfMicroaliado.productos) {
      if (iterator.id === data.productos.id) {
        if (iterator.cantidad < data.productos.cantidad) {
          return res.status(409).json({
            status: 'Error',
            mensaje:
              'No puedes mandar esta cantidad a produccion, es mayor a la que hay en tu inventario',
          });
        }
      }
    }
    const usuario = await usuarioModel.findOne({ codigo: data.codigoUsuario });
    if (!usuario) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'El usuario no existe',
      });
    }
    const productoExistente = await inventarioModel.findOne({
      'productos.id': data.productos.id,
    });
    if (!productoExistente) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'El producto no esta en tu inventario',
      });
    }
    const usuarios = await usuarioModel.find({
      codigoMicroaliadoEncargado: inventarioOfMicroaliado.codigoUsuario,
    });
    for (const iterator of usuarios) {
      if (
        parseInt(iterator.codigo) == parseInt(data.codigoUsuario) ||
        parseInt(iterator.codigoMicroaliadoEncargado) ==
          parseInt(data.codigoUsuario)
      ) {
        canMoveToDistribucion = true;
      } else if (!canMoveToDistribucion) {
        return res.status(409).json({
          status: 'Error',
          mensaje: 'Este vendedor no lo encontramos asociado a su inventario',
        });
      }
    }
    if (!inventarioOfMicroaliado) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No existe inventario para empezar la distribucion',
      });
    } else if (canMoveToDistribucion == true) {
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
              'Al parecer el producto no esta en el inventario o no tiene cantidades disponibles',
          });
        }
        for (const product of distribucionActiva.productos) {
          idDistribucion = product.id;
        }
        if (idDistribucion === data.productos.id) {
          const inventario = await inventarioModel.findOneAndUpdate(
            {
              _id: data.codigoInventario,
              'productos.id': data.productos.id,
            },
            { $inc: { 'productos.$.cantidad': -data.productos.cantidad } }
          );
          let cantidadMostrar;
          for (const iterator of inventario.productos) {
            if (data.productos.id === iterator.id) {
              cantidadMostrar = iterator.cantidad;
            }
          }
          await distribucionModel.findOneAndUpdate(
            {
              codigoInventario: data.codigoInventario,
              'productos.id': data.productos.id,
            },
            {
              $inc: {
                'productos.$.cantidad': data.productos.cantidad,
              },
            },
            {
              new: true,
            }
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
        }
      } else {
        const salidaDistribucion = new distribucionModel(data);
        await salidaDistribucion.save();
        await inventarioModel.findOneAndUpdate(
          {
            _id: data.codigoInventario,
            'productos.id': data.productos.id,
          },
          { $inc: { 'productos.$.cantidad': -data.productos.cantidad } }
        );
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
    const inventario = await inventarioModel.findById(data.codigoInventario);
    if (!inventario) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No se encontro un inventario asociado a este codigo',
      });
    }
    const distribucionActual = await distribucionModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });
    if (!distribucionActual) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No se encontro una distribucion activa',
      });
    }
    for (const key of data.productos) {
      try {
        for (const iterator of distribucionActual.productos) {
          if (iterator.id === key.id) {
            if (key.cantidad > iterator.cantidad) {
              return res.status(409).json({
                status: 'Error',
                mensaje:
                  'No puedes devolver mas de los productos que tienes en distribucion',
              });
            }
            await inventarioModel.findOneAndUpdate(
              {
                _id: data.codigoInventario,
                'productos.id': key.id,
              },
              { $inc: { 'productos.$.cantidad': key.cantidad } }
            );
            await distribucionModel.findOneAndUpdate(
              {
                codigoUsuario: data.codigoUsuario,
                'productos.id': key.id,
              },
              {
                $inc: { 'productos.$.cantidad': -key.cantidad },
              }
            );
            const removeOrNotRemoveDistri = await distribucionModel.findOne({
              codigoUsuario: data.codigoUsuario,
              'productos.id': key.id,
            });
            for (const iterator of removeOrNotRemoveDistri.productos) {
              for (const i of data.productos) {
                if (i.id === iterator.id) {
                  if (iterator.cantidad == 0) {
                    await distribucionModel.findOneAndUpdate(
                      {
                        codigoUsuario: data.codigoUsuario,
                        'productos.id': key.id,
                      },
                      { $pull: { productos: { id: iterator.id } } }
                    );
                  }
                }
              }
            }
            const distribucionActiva = await distribucionModel.findOne({
              codigoUsuario: data.codigoUsuario,
            });
            if (distribucionActiva.productos.length == 0) {
              await distribucionModel.findOneAndRemove({
                codigoUsuario: data.codigoUsuario,
              });
            }
          }
        }
        return res.status(200).json({
          status: 'Success',
          mensaje: 'Distribucion finalizada',
        });
      } catch (err) {
        console.log(err);
        return res.status(409).json({
          status: 'Error',
          mensaje: 'Hubo un problema con los productos que intentas devolver',
        });
      }
    }
    return res.status(409).json({
      status: 'Error',
      mensaje:
        'Hubo un problema con los productos en distribucion, comunicate con el administrador',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = inventarioVendedorController;
