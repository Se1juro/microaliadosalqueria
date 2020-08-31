"use strict";

var distribucionModel = require('../models/distribucionModel');

var inventarioModel = require('../models/inventarioModel');

var usuarioModel = require('../models/usuarioModel');

var inventarioVendedorController = {};

inventarioVendedorController.moveToDistribution = function _callee(req, res, next) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            data = {
              codigoUsuario: req.body.codigoUsuario,
              productos: req.body.productos,
              horaSalida: Date.now(),
              codigoInventario: req.body.codigoInventario
            };
            console.log(data);
          } catch (error) {
            next(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

inventarioVendedorController.finalizarDistribucion = function _callee2(req, res, next) {
  var data, inventario, distribucionActual, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, iterator, removeOrNotRemoveDistri, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _iterator4, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator5, _step4, i, distribucionActiva;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          data = {
            codigoUsuario: req.body.codigoUsuario,
            codigoInventario: req.body.codigoInventario,
            productos: req.body.productos
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(inventarioModel.findById(data.codigoInventario));

        case 4:
          inventario = _context2.sent;

          if (inventario) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se encontro un inventario asociado a este codigo'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(distribucionModel.findOne({
            codigoUsuario: data.codigoUsuario
          }));

        case 9:
          distribucionActual = _context2.sent;

          if (distribucionActual) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se encontro una distribucion activa'
          }));

        case 12:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 15;
          _iterator = data.productos[Symbol.iterator]();

        case 17:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 121;
            break;
          }

          key = _step.value;
          _context2.prev = 19;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 23;
          _iterator2 = distribucionActual.productos[Symbol.iterator]();

        case 25:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 98;
            break;
          }

          iterator = _step2.value;

          if (!(iterator.id === key.id)) {
            _context2.next = 95;
            break;
          }

          if (!(key.cantidad > iterator.cantidad)) {
            _context2.next = 30;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No puedes devolver mas de los productos que tienes en distribucion'
          }));

        case 30:
          _context2.next = 32;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            _id: data.codigoInventario,
            'productos.id': key.id
          }, {
            $inc: {
              'productos.$.cantidad': key.cantidad
            }
          }));

        case 32:
          _context2.next = 34;
          return regeneratorRuntime.awrap(distribucionModel.findOneAndUpdate({
            codigoUsuario: data.codigoUsuario,
            'productos.id': key.id
          }, {
            $inc: {
              'productos.$.cantidad': -key.cantidad
            }
          }));

        case 34:
          _context2.next = 36;
          return regeneratorRuntime.awrap(distribucionModel.findOne({
            codigoUsuario: data.codigoUsuario,
            'productos.id': key.id
          }));

        case 36:
          removeOrNotRemoveDistri = _context2.sent;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context2.prev = 40;
          _iterator3 = removeOrNotRemoveDistri.productos[Symbol.iterator]();

        case 42:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context2.next = 75;
            break;
          }

          _iterator4 = _step3.value;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context2.prev = 47;
          _iterator5 = data.productos[Symbol.iterator]();

        case 49:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator5.next()).done) {
            _context2.next = 58;
            break;
          }

          i = _step4.value;

          if (!(i.id === _iterator4.id)) {
            _context2.next = 55;
            break;
          }

          if (!(_iterator4.cantidad === 0)) {
            _context2.next = 55;
            break;
          }

          _context2.next = 55;
          return regeneratorRuntime.awrap(distribucionModel.findOneAndUpdate({
            codigoUsuario: data.codigoUsuario,
            'productos.id': key.id
          }, {
            $pull: {
              productos: {
                id: _iterator4.id
              }
            }
          }));

        case 55:
          _iteratorNormalCompletion4 = true;
          _context2.next = 49;
          break;

        case 58:
          _context2.next = 64;
          break;

        case 60:
          _context2.prev = 60;
          _context2.t0 = _context2["catch"](47);
          _didIteratorError4 = true;
          _iteratorError4 = _context2.t0;

        case 64:
          _context2.prev = 64;
          _context2.prev = 65;

          if (!_iteratorNormalCompletion4 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 67:
          _context2.prev = 67;

          if (!_didIteratorError4) {
            _context2.next = 70;
            break;
          }

          throw _iteratorError4;

        case 70:
          return _context2.finish(67);

        case 71:
          return _context2.finish(64);

        case 72:
          _iteratorNormalCompletion3 = true;
          _context2.next = 42;
          break;

        case 75:
          _context2.next = 81;
          break;

        case 77:
          _context2.prev = 77;
          _context2.t1 = _context2["catch"](40);
          _didIteratorError3 = true;
          _iteratorError3 = _context2.t1;

        case 81:
          _context2.prev = 81;
          _context2.prev = 82;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 84:
          _context2.prev = 84;

          if (!_didIteratorError3) {
            _context2.next = 87;
            break;
          }

          throw _iteratorError3;

        case 87:
          return _context2.finish(84);

        case 88:
          return _context2.finish(81);

        case 89:
          _context2.next = 91;
          return regeneratorRuntime.awrap(distribucionModel.findOne({
            codigoUsuario: data.codigoUsuario
          }));

        case 91:
          distribucionActiva = _context2.sent;

          if (!(distribucionActiva.productos.length === 0)) {
            _context2.next = 95;
            break;
          }

          _context2.next = 95;
          return regeneratorRuntime.awrap(distribucionModel.findOneAndRemove({
            codigoUsuario: data.codigoUsuario
          }));

        case 95:
          _iteratorNormalCompletion2 = true;
          _context2.next = 25;
          break;

        case 98:
          _context2.next = 104;
          break;

        case 100:
          _context2.prev = 100;
          _context2.t2 = _context2["catch"](23);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t2;

        case 104:
          _context2.prev = 104;
          _context2.prev = 105;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 107:
          _context2.prev = 107;

          if (!_didIteratorError2) {
            _context2.next = 110;
            break;
          }

          throw _iteratorError2;

        case 110:
          return _context2.finish(107);

        case 111:
          return _context2.finish(104);

        case 112:
          return _context2.abrupt("return", res.status(200).json({
            status: 'Success',
            message: 'Distribucion finalizada'
          }));

        case 115:
          _context2.prev = 115;
          _context2.t3 = _context2["catch"](19);
          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'Hubo un problema con los productos que intentas devolver'
          }));

        case 118:
          _iteratorNormalCompletion = true;
          _context2.next = 17;
          break;

        case 121:
          _context2.next = 127;
          break;

        case 123:
          _context2.prev = 123;
          _context2.t4 = _context2["catch"](15);
          _didIteratorError = true;
          _iteratorError = _context2.t4;

        case 127:
          _context2.prev = 127;
          _context2.prev = 128;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 130:
          _context2.prev = 130;

          if (!_didIteratorError) {
            _context2.next = 133;
            break;
          }

          throw _iteratorError;

        case 133:
          return _context2.finish(130);

        case 134:
          return _context2.finish(127);

        case 135:
          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'Hubo un problema con los productos en distribucion, comunicate con el administrador'
          }));

        case 138:
          _context2.prev = 138;
          _context2.t5 = _context2["catch"](0);
          next(_context2.t5);

        case 141:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 138], [15, 123, 127, 135], [19, 115], [23, 100, 104, 112], [40, 77, 81, 89], [47, 60, 64, 72], [65,, 67, 71], [82,, 84, 88], [105,, 107, 111], [128,, 130, 134]]);
};

inventarioVendedorController.getDistribution = function _callee3(req, res, next) {
  var distribution;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(distribucionModel.find({
            codigoUsuario: req.params.id
          }));

        case 3:
          distribution = _context3.sent;

          if (distribution) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se encontro tu distribucion'
          }));

        case 6:
          return _context3.abrupt("return", res.status(200).json({
            status: 'Success',
            distribution: distribution
          }));

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = inventarioVendedorController;