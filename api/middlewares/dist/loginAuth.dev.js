"use strict";

var jwt = require('jsonwebtoken');

var secretKey = process.env.SECRETKEY;
var loginAuth = {};

loginAuth.verificarToken = function _callee(req, res, next) {
  var token, payload;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.headers.authorization) {
            _context.next = 4;
            break;
          }

          console.log('Falta header authorization');
          return _context.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'Peticion no autorizada'
          }));

        case 4:
          token = req.headers.authorization.split(' ')[1];

          if (!(token === '' || null)) {
            _context.next = 8;
            break;
          }

          console.log('No hay token');
          return _context.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'Peticion no autorizada'
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(jwt.verify(token, secretKey));

        case 10:
          payload = _context.sent;

          if (payload) {
            _context.next = 14;
            break;
          }

          console.log('No se verifica');
          return _context.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'Peticion no autorizada'
          }));

        case 14:
          req.userId = payload._id;
          next();
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            status: 'Error',
            mensaje: 'Peticion no autorizada'
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

module.exports = loginAuth;