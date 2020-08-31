"use strict";

var distributionAuth = {};

var jwt = require('jsonwebtoken');

var secretKey = process.env.SECRETKEY;

distributionAuth.canFinishDelivery = function _callee2(req, res, next) {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.headers.authorization.split(' ')[1];
          _context2.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, secretKey, function _callee(err, decoded) {
            var data, canMoveToDistribucion, inventarioOfMicroaliado, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iterator, usuario, productoExistente, usuarios, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _iterator3;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    data = {
                      codigoUsuario: req.body.codigoUsuario,
                      productos: req.body.productos,
                      horaSalida: Date.now(),
                      codigoInventario: req.body.codigoInventario
                    };
                    canMoveToDistribucion = false;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(inventarioModel.findOne({
                      _id: data.codigoInventario
                    }));

                  case 4:
                    inventarioOfMicroaliado = _context.sent;

                    if (inventarioOfMicroaliado) {
                      _context.next = 7;
                      break;
                    }

                    return _context.abrupt("return", res.status(409).json({
                      status: 'Error',
                      message: 'El inventario no existe'
                    }));

                  case 7:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 10;
                    _iterator = inventarioOfMicroaliado.productos[Symbol.iterator]();

                  case 12:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context.next = 20;
                      break;
                    }

                    iterator = _step.value;

                    if (!(iterator.id === data.productos.id)) {
                      _context.next = 17;
                      break;
                    }

                    if (!(iterator.cantidad < data.productos.cantidad)) {
                      _context.next = 17;
                      break;
                    }

                    return _context.abrupt("return", res.status(409).json({
                      status: 'Error',
                      message: 'No puedes mandar esta cantidad a produccion, es mayor a la que hay en tu inventario'
                    }));

                  case 17:
                    _iteratorNormalCompletion = true;
                    _context.next = 12;
                    break;

                  case 20:
                    _context.next = 26;
                    break;

                  case 22:
                    _context.prev = 22;
                    _context.t0 = _context["catch"](10);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 26:
                    _context.prev = 26;
                    _context.prev = 27;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 29:
                    _context.prev = 29;

                    if (!_didIteratorError) {
                      _context.next = 32;
                      break;
                    }

                    throw _iteratorError;

                  case 32:
                    return _context.finish(29);

                  case 33:
                    return _context.finish(26);

                  case 34:
                    _context.next = 36;
                    return regeneratorRuntime.awrap(usuarioModel.findOne({
                      codigo: data.codigoUsuario
                    }));

                  case 36:
                    usuario = _context.sent;

                    if (usuario) {
                      _context.next = 39;
                      break;
                    }

                    return _context.abrupt("return", res.status(409).json({
                      status: 'Error',
                      message: 'El usuario no existe'
                    }));

                  case 39:
                    _context.next = 41;
                    return regeneratorRuntime.awrap(inventarioModel.findOne({
                      'productos.id': data.productos.id
                    }));

                  case 41:
                    productoExistente = _context.sent;

                    if (productoExistente) {
                      _context.next = 44;
                      break;
                    }

                    return _context.abrupt("return", res.status(409).json({
                      status: 'Error',
                      message: 'El producto no esta en tu inventario'
                    }));

                  case 44:
                    _context.next = 46;
                    return regeneratorRuntime.awrap(usuarioModel.find({
                      codigoMicroaliadoEncargado: inventarioOfMicroaliado.codigoUsuario
                    }));

                  case 46:
                    usuarios = _context.sent;
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context.prev = 50;
                    _iterator2 = usuarios[Symbol.iterator]();

                  case 52:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context.next = 63;
                      break;
                    }

                    _iterator3 = _step2.value;

                    if (!(parseInt(_iterator3.codigo) == parseInt(data.codigoUsuario) || parseInt(_iterator3.codigoMicroaliadoEncargado) == parseInt(data.codigoUsuario))) {
                      _context.next = 58;
                      break;
                    }

                    canMoveToDistribucion = true;
                    _context.next = 60;
                    break;

                  case 58:
                    if (canMoveToDistribucion) {
                      _context.next = 60;
                      break;
                    }

                    return _context.abrupt("return", res.status(409).json({
                      status: 'Error',
                      message: 'Este vendedor no lo encontramos asociado a su inventario'
                    }));

                  case 60:
                    _iteratorNormalCompletion2 = true;
                    _context.next = 52;
                    break;

                  case 63:
                    _context.next = 69;
                    break;

                  case 65:
                    _context.prev = 65;
                    _context.t1 = _context["catch"](50);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context.t1;

                  case 69:
                    _context.prev = 69;
                    _context.prev = 70;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 72:
                    _context.prev = 72;

                    if (!_didIteratorError2) {
                      _context.next = 75;
                      break;
                    }

                    throw _iteratorError2;

                  case 75:
                    return _context.finish(72);

                  case 76:
                    return _context.finish(69);

                  case 77:
                    if (inventarioOfMicroaliado) {
                      _context.next = 79;
                      break;
                    }

                    return _context.abrupt("return", res.status(409).json({
                      status: 'Error',
                      message: 'No existe inventario para empezar la distribucion'
                    }));

                  case 79:
                    next();

                  case 80:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[10, 22, 26, 34], [27,, 29, 33], [50, 65, 69, 77], [70,, 72, 76]]);
          }));

        case 4:
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(401).json({
            error: 'Error',
            message: 'Error con el servidor, comunicate con el admin'
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = distributionAuth;