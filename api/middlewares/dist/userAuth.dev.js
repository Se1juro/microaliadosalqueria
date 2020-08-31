"use strict";

var userAuth = {};

var jwt = require('jsonwebtoken');

var secretKey = process.env.SECRETKEY;

userAuth.canViewUser = function _callee2(req, res, next) {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.headers.authorization.split(' ')[1];
          _context2.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, secretKey, function _callee(err, decoded) {
            var codigoUsuario;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    codigoUsuario = req.params.id;

                    if (!(decoded.rol === 'admin' || codigoUsuario == decoded.codigoReferencia)) {
                      _context.next = 5;
                      break;
                    }

                    next();
                    _context.next = 7;
                    break;

                  case 5:
                    console.log('Sisa');
                    return _context.abrupt("return", res.status(401).json({
                      status: 'Error',
                      Error: 'Peticion no autorizada'
                    }));

                  case 7:
                    if (!err) {
                      _context.next = 10;
                      break;
                    }

                    console.log(err);
                    return _context.abrupt("return", res.status(401).json({
                      status: 'Error',
                      Error: 'Peticion no autorizada'
                    }));

                  case 10:
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
            mensaje: 'Peticion no autorizada'
          }));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

userAuth.datosRegister = function _callee3(req, res, next) {
  var data, _i, _data, iterator;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          data = Object.values(req.body);
          console.log(data);
          _i = 0, _data = data;

        case 4:
          if (!(_i < _data.length)) {
            _context3.next = 11;
            break;
          }

          iterator = _data[_i];

          if (!(iterator === '' || iterator === undefined)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Por favor rellena tus datos'
          }));

        case 8:
          _i++;
          _context3.next = 4;
          break;

        case 11:
          next();
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Hubo un problema con tu registro, intentalo de nuevo'
          }));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = userAuth;