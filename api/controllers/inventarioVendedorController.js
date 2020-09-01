const distribucionModel = require('../models/distribucionModel');
const inventarioModel = require('../models/inventarioModel');
const inventarioVendedorController = {};
subtractQuantityFromInventory = async (
  codigoUsuario,
  codigoProducto,
  cantidadProducto
) => {
  await inventarioModel.findOneAndUpdate(
    {
      codigoUsuario: codigoUsuario,
      'productos.id': codigoProducto,
    },
    {
      $inc: { 'productos.$.cantidad': -cantidadProducto },
    }
  );
};
inventarioVendedorController.moveToDistribution = async (req, res, next) => {
  try {
    let operation;
    const data = {
      codigoUsuario: req.body.codigoUsuario,
      productos: req.body.productos,
      horaSalida: Date.now(),
      codigoInventario: req.body.codigoInventario,
    };
    const findDistribution = await distribucionModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });

    if (!findDistribution) {
      const distribution = new distribucionModel({
        codigoUsuario: data.codigoUsuario,
        productos: data.productos,
        codigoInventario: data.codigoInventario,
        horaSalida: data.horaSalida,
      });
      await distribution.save();
      return res.status(200).json({
        status: 'Success',
        message: 'Se creo y se actualizo su distribucion',
      });
    }
    const findProductInDelivery = await distribucionModel.findOne({
      codigoUsuario: data.codigoUsuario,
      'productos.id': data.productos.id,
    });
    if (!findProductInDelivery) {
      operation = await distribucionModel.findOneAndUpdate(
        {
          codigoUsuario: data.codigoUsuario,
        },
        {
          $push: {
            productos: data.productos,
          },
        }
      );
      await subtractQuantityFromInventory(
        data.codigoUsuario,
        data.productos.id,
        data.productos.cantidad
      );
    } else {
      operation = await distribucionModel.updateOne(
        {
          codigoUsuario: data.codigoUsuario,
          'productos.id': data.productos.id,
        },
        { $inc: { 'productos.$.cantidad': data.productos.cantidad } }
      );
      await subtractQuantityFromInventory(
        data.codigoUsuario,
        data.productos.id,
        data.productos.cantidad
      );
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Se ha movido el producto a distribucion',
    });
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
        message: 'No se encontro un inventario asociado a este codigo',
      });
    }
    const distribucionActual = await distribucionModel.findOne({
      codigoUsuario: data.codigoUsuario,
    });
    if (!distribucionActual) {
      return res.status(409).json({
        status: 'Error',
        message: 'No se encontro una distribucion activa',
      });
    }
    for (const key of data.productos) {
      try {
        for (const iterator of distribucionActual.productos) {
          if (iterator.id === key.id) {
            if (key.cantidad > iterator.cantidad) {
              return res.status(409).json({
                status: 'Error',
                message:
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
                  if (iterator.cantidad === 0) {
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
            if (distribucionActiva.productos.length === 0) {
              await distribucionModel.findOneAndRemove({
                codigoUsuario: data.codigoUsuario,
              });
            }
          }
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Distribucion finalizada',
        });
      } catch (err) {
        return res.status(409).json({
          status: 'Error',
          message: 'Hubo un problema con los productos que intentas devolver',
        });
      }
    }
    return res.status(409).json({
      status: 'Error',
      message:
        'Hubo un problema con los productos en distribucion, comunicate con el administrador',
    });
  } catch (error) {
    next(error);
  }
};
inventarioVendedorController.getDistribution = async (req, res, next) => {
  try {
    const distribution = await distribucionModel.find({
      codigoUsuario: req.params.id,
    });
    if (!distribution) {
      return res.status(409).json({
        status: 'Error',
        message: 'No se encontro tu distribucion',
      });
    }
    return res.status(200).json({
      status: 'Success',
      distribution,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = inventarioVendedorController;
