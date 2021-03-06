const inventarioAuth = {};
const jwt = require('jsonwebtoken');
const inventarioModel = require('../models/inventarioModel');
const usuarioModel = require('../models/usuarioModel');
const secretKey = process.env.SECRETKEY;
inventarioAuth.canManageInventory = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      const codigoInventario = req.params.id;
      const inventario = await inventarioModel.findById(codigoInventario);
      if (inventario.codigoUsuario !== decoded.codigoReferencia) {
        return res.status(401).json({
          status: 'Error',
          mensaje: 'No puedes editar este inventario',
        });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'No tienes autorizacion para manejar este inventario',
    });
  }
};
inventarioAuth.canViewInventory = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      const codigoUsuario = req.params.id;
      const inventario = await inventarioModel.findOne({
        codigoUsuario: codigoUsuario,
      });
      const seller = await usuarioModel.findOne({
        codigoMicroaliadoEncargado: codigoUsuario,
      });
      if (seller) {
        return next();
      }
      if (!inventario) {
        console.log('Aqui no hay');
        return res.status(409).json({
          status: 'Error',
          mensaje: 'No existe el inventario',
        });
      }
      if (inventario.codigoUsuario !== decoded.codigoReferencia) {
        console.log('No coincido');
        return res.status(401).json({
          status: 'Error',
          mensaje: 'No puedes acceder a este inventario',
        });
      }

      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'No tienes autorizacion para manejar este inventario',
    });
  }
};
inventarioAuth.canCreateInventory = async (req, res, next) => {
  try {
    const codigoUsuario = req.body.codigoUsuario;
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      const inventario = await inventarioModel.findOne({
        codigoUsuario: codigoUsuario,
      });
      if (inventario) {
        if (decoded.codigoReferencia !== inventario.codigoUsuario) {
          return res.status(401).json({
            status: 'Error',
            mensaje: 'No tienes permisos para manejar este inventario',
          });
        }
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'No tienes autorizacion para manejar este inventario',
    });
  }
};
module.exports = inventarioAuth;
