"use strict";

var distributionAuth = {};

var inventarioModel = require('../models/inventarioModel');

var usuarioModel = require('../models/usuarioModel');

distributionAuth.canFinishDelivery = function _callee(req, res, next) {
  var inventario, usuario, product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(inventarioModel.findById(req.body.codigoInventario));

        case 3:
          inventario = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: req.body.codigoUsuario
          }));

        case 6:
          usuario = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(inventarioModel.findOne({
            codigoUsuario: req.body.codigoUsuario,
            'productos.id': req.body.productos.id
          }));

        case 9:
          product = _context.sent;

          if (inventario) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se encontro el inventario'
          }));

        case 12:
          if (usuario) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se encontro el usuario'
          }));

        case 14:
          if (product) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se encontro el producto'
          }));

        case 16:
          next();
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(401).json({
            error: 'Error',
            message: 'Error con el servidor, comunicate con el admin'
          }));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

module.exports = distributionAuth;