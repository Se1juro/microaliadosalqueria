"use strict";

var inventarioAuth = {};

var jwt = require('jsonwebtoken');

var inventarioModel = require('../models/inventarioModel');

var secretKey = process.env.SECRETKEY;

inventarioAuth.canManageInventory = function _callee2(req, res, next) {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.headers.authorization.split(' ')[1];
          _context2.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, secretKey, function _callee(err, decoded) {
            var codigoInventario, inventario;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    codigoInventario = req.params.id;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(inventarioModel.findById(codigoInventario));

                  case 3:
                    inventario = _context.sent;

                    if (!(inventario.codigoUsuario !== decoded.codigoReferencia)) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt("return", res.status(401).json({
                      status: 'Error',
                      mensaje: 'No puedes editar este inventario'
                    }));

                  case 6:
                    next();

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 4:
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'No tienes autorizacion para manejar este inventario'
          }));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

inventarioAuth.canViewInventory = function _callee4(req, res, next) {
  var token;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.headers.authorization.split(' ')[1];
          _context4.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, secretKey, function _callee3(err, decoded) {
            var codigoUsuario, inventario;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    codigoUsuario = req.params.id;
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(inventarioModel.findOne({
                      codigoUsuario: codigoUsuario
                    }));

                  case 3:
                    inventario = _context3.sent;

                    if (inventario) {
                      _context3.next = 8;
                      break;
                    }

                    return _context3.abrupt("return", res.status(409).json({
                      status: 'Error',
                      mensaje: 'No existe el inventario'
                    }));

                  case 8:
                    if (!(inventario.codigoUsuario !== decoded.codigoReferencia)) {
                      _context3.next = 11;
                      break;
                    }

                    console.log('No puedo acceder al inventario');
                    return _context3.abrupt("return", res.status(401).json({
                      status: 'Error',
                      mensaje: 'No puedes acceder a este inventario'
                    }));

                  case 11:
                    next();

                  case 12:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 4:
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'No tienes autorizacion para manejar este inventario'
          }));

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

inventarioAuth.canCreateInventory = function _callee6(req, res, next) {
  var codigoUsuario, token;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          codigoUsuario = req.body.codigoUsuario;
          token = req.headers.authorization.split(' ')[1];
          _context6.next = 5;
          return regeneratorRuntime.awrap(jwt.verify(token, secretKey, function _callee5(err, decoded) {
            var inventario;
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(inventarioModel.findOne({
                      codigoUsuario: codigoUsuario
                    }));

                  case 2:
                    inventario = _context5.sent;

                    if (!inventario) {
                      _context5.next = 6;
                      break;
                    }

                    if (!(decoded.codigoReferencia !== inventario.codigoUsuario)) {
                      _context5.next = 6;
                      break;
                    }

                    return _context5.abrupt("return", res.status(401).json({
                      status: 'Error',
                      mensaje: 'No tienes permisos para manejar este inventario'
                    }));

                  case 6:
                    next();

                  case 7:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          }));

        case 5:
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'No tienes autorizacion para manejar este inventario'
          }));

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = inventarioAuth;