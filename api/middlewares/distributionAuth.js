const distributionAuth = {};
const inventarioModel = require('../models/inventarioModel');
const usuarioModel = require('../models/usuarioModel');
distributionAuth.canFinishDelivery = async (req, res, next) => {
  try {
    const inventario = await inventarioModel.findById(
      req.body.codigoInventario
    );
    const usuario = await usuarioModel.findOne({
      codigo: req.body.codigoUsuario,
    });
    const product = await inventarioModel.findOne({
      codigoUsuario: req.body.codigoUsuario,
      'productos.id': req.body.productos.id,
    });
    if (!inventario) {
      return res.status(409).json({
        status: 'Error',
        message: 'No se encontro el inventario',
      });
    }
    if (!usuario) {
      return res.status(409).json({
        status: 'Error',
        message: 'No se encontro el usuario',
      });
    }
    if (!product) {
      return res.status(409).json({
        status: 'Error',
        message: 'No se encontro el producto',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'Error',
      message: 'Error con el servidor, comunicate con el admin',
    });
  }
};

module.exports = distributionAuth;
