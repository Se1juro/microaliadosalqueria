"use strict";

var distribucionModel = require('../models/distribucionModel');

var inventarioModel = require('../models/inventarioModel');

var usuarioModel = require('../models/usuarioModel');

var inventarioVendedorController = {};

inventarioVendedorController.moveToDistribution = function _callee(req, res, next) {
  var canMoveToDistribucion, data, inventarioOfMicroaliado, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _iterator8, usuario, productoExistente, usuarios, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _iterator9, valorObjeto, cantidadInventario, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _iterator7, distribucionActiva, newInventario, idDistribucion, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, uwu, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, product, inventario, cantidadMostrar, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, iterator, salidaDistribucion;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          canMoveToDistribucion = false;
          data = {
            codigoUsuario: req.body.codigoUsuario,
            productos: req.body.productos,
            horaSalida: Date.now(),
            codigoInventario: req.body.codigoInventario
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(inventarioModel.findOne({
            _id: data.codigoInventario
          }));

        case 5:
          inventarioOfMicroaliado = _context.sent;

          if (inventarioOfMicroaliado) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El inventario no existe'
          }));

        case 8:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 11;
          _iterator = inventarioOfMicroaliado.productos[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 21;
            break;
          }

          _iterator8 = _step.value;

          if (!(_iterator8.id === data.productos.id)) {
            _context.next = 18;
            break;
          }

          if (!(_iterator8.cantidad < data.productos.cantidad)) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No puedes mandar esta cantidad a produccion, es mayor a la que hay en tu inventario'
          }));

        case 18:
          _iteratorNormalCompletion = true;
          _context.next = 13;
          break;

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 27:
          _context.prev = 27;
          _context.prev = 28;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 30:
          _context.prev = 30;

          if (!_didIteratorError) {
            _context.next = 33;
            break;
          }

          throw _iteratorError;

        case 33:
          return _context.finish(30);

        case 34:
          return _context.finish(27);

        case 35:
          _context.next = 37;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: data.codigoUsuario
          }));

        case 37:
          usuario = _context.sent;

          if (usuario) {
            _context.next = 40;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario no existe'
          }));

        case 40:
          _context.next = 42;
          return regeneratorRuntime.awrap(inventarioModel.findOne({
            'productos.id': data.productos.id
          }));

        case 42:
          productoExistente = _context.sent;

          if (productoExistente) {
            _context.next = 45;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El producto no esta en tu inventario'
          }));

        case 45:
          _context.next = 47;
          return regeneratorRuntime.awrap(usuarioModel.find({
            codigoMicroaliadoEncargado: inventarioOfMicroaliado.codigoUsuario
          }));

        case 47:
          usuarios = _context.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 51;
          _iterator2 = usuarios[Symbol.iterator]();

        case 53:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 64;
            break;
          }

          _iterator9 = _step2.value;

          if (!(parseInt(_iterator9.codigo) == parseInt(data.codigoUsuario) || parseInt(_iterator9.codigoMicroaliadoEncargado) == parseInt(data.codigoUsuario))) {
            _context.next = 59;
            break;
          }

          canMoveToDistribucion = true;
          _context.next = 61;
          break;

        case 59:
          if (canMoveToDistribucion) {
            _context.next = 61;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Este vendedor no lo encontramos asociado a su inventario'
          }));

        case 61:
          _iteratorNormalCompletion2 = true;
          _context.next = 53;
          break;

        case 64:
          _context.next = 70;
          break;

        case 66:
          _context.prev = 66;
          _context.t1 = _context["catch"](51);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 70:
          _context.prev = 70;
          _context.prev = 71;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 73:
          _context.prev = 73;

          if (!_didIteratorError2) {
            _context.next = 76;
            break;
          }

          throw _iteratorError2;

        case 76:
          return _context.finish(73);

        case 77:
          return _context.finish(70);

        case 78:
          if (inventarioOfMicroaliado) {
            _context.next = 82;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No existe inventario para empezar la distribucion'
          }));

        case 82:
          if (!(canMoveToDistribucion == true)) {
            _context.next = 190;
            break;
          }

          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context.prev = 86;

          for (_iterator3 = inventarioOfMicroaliado.productos[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _iterator7 = _step3.value;
            valorObjeto = Object.values(data.productos);

            if (valorObjeto[0] === _iterator7.id) {
              data.productos.cantidadInventario = _iterator7.cantidad;
            }
          }

          _context.next = 94;
          break;

        case 90:
          _context.prev = 90;
          _context.t2 = _context["catch"](86);
          _didIteratorError3 = true;
          _iteratorError3 = _context.t2;

        case 94:
          _context.prev = 94;
          _context.prev = 95;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 97:
          _context.prev = 97;

          if (!_didIteratorError3) {
            _context.next = 100;
            break;
          }

          throw _iteratorError3;

        case 100:
          return _context.finish(97);

        case 101:
          return _context.finish(94);

        case 102:
          _context.next = 104;
          return regeneratorRuntime.awrap(distribucionModel.findOne({
            codigoUsuario: data.codigoUsuario
          }));

        case 104:
          distribucionActiva = _context.sent;
          _context.next = 107;
          return regeneratorRuntime.awrap(inventarioModel.findById(data.codigoInventario));

        case 107:
          newInventario = _context.sent;

          if (!distribucionActiva) {
            _context.next = 184;
            break;
          }

          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context.prev = 112;

          for (_iterator4 = newInventario.productos[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            uwu = _step4.value;

            if (uwu.id === data.productos.id) {
              cantidadInventario = uwu.cantidad;
            }
          }

          _context.next = 120;
          break;

        case 116:
          _context.prev = 116;
          _context.t3 = _context["catch"](112);
          _didIteratorError4 = true;
          _iteratorError4 = _context.t3;

        case 120:
          _context.prev = 120;
          _context.prev = 121;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 123:
          _context.prev = 123;

          if (!_didIteratorError4) {
            _context.next = 126;
            break;
          }

          throw _iteratorError4;

        case 126:
          return _context.finish(123);

        case 127:
          return _context.finish(120);

        case 128:
          if (!(cantidadInventario === undefined || cantidadInventario === 0)) {
            _context.next = 130;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Al parecer el producto no esta en el inventario o no tiene cantidades disponibles'
          }));

        case 130:
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context.prev = 133;

          for (_iterator5 = distribucionActiva.productos[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            product = _step5.value;
            idDistribucion = product.id;
          }

          _context.next = 141;
          break;

        case 137:
          _context.prev = 137;
          _context.t4 = _context["catch"](133);
          _didIteratorError5 = true;
          _iteratorError5 = _context.t4;

        case 141:
          _context.prev = 141;
          _context.prev = 142;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 144:
          _context.prev = 144;

          if (!_didIteratorError5) {
            _context.next = 147;
            break;
          }

          throw _iteratorError5;

        case 147:
          return _context.finish(144);

        case 148:
          return _context.finish(141);

        case 149:
          if (!(idDistribucion === data.productos.id)) {
            _context.next = 177;
            break;
          }

          _context.next = 152;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            _id: data.codigoInventario,
            'productos.id': data.productos.id
          }, {
            $inc: {
              'productos.$.cantidad': -data.productos.cantidad
            }
          }));

        case 152:
          inventario = _context.sent;
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context.prev = 156;

          for (_iterator6 = inventario.productos[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            iterator = _step6.value;

            if (data.productos.id === iterator.id) {
              cantidadMostrar = iterator.cantidad;
            }
          }

          _context.next = 164;
          break;

        case 160:
          _context.prev = 160;
          _context.t5 = _context["catch"](156);
          _didIteratorError6 = true;
          _iteratorError6 = _context.t5;

        case 164:
          _context.prev = 164;
          _context.prev = 165;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 167:
          _context.prev = 167;

          if (!_didIteratorError6) {
            _context.next = 170;
            break;
          }

          throw _iteratorError6;

        case 170:
          return _context.finish(167);

        case 171:
          return _context.finish(164);

        case 172:
          _context.next = 174;
          return regeneratorRuntime.awrap(distribucionModel.findOneAndUpdate({
            codigoInventario: data.codigoInventario,
            'productos.id': data.productos.id
          }, {
            $inc: {
              'productos.$.cantidad': data.productos.cantidad
            }
          }, {
            "new": true
          }));

        case 174:
          return _context.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Distribucion actualizada'
          }));

        case 177:
          _context.next = 179;
          return regeneratorRuntime.awrap(distribucionModel.findOneAndUpdate({
            codigoInventario: data.codigoInventario
          }, {
            $push: {
              productos: data.productos
            }
          }));

        case 179:
          _context.next = 181;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            _id: data.codigoInventario,
            'productos.id': data.productos.id
          }, {
            $inc: {
              'productos.$.cantidad': -data.productos.cantidad
            }
          }));

        case 181:
          return _context.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Distribucion actualizada'
          }));

        case 182:
          _context.next = 190;
          break;

        case 184:
          salidaDistribucion = new distribucionModel(data);
          _context.next = 187;
          return regeneratorRuntime.awrap(salidaDistribucion.save());

        case 187:
          _context.next = 189;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            _id: data.codigoInventario,
            'productos.id': data.productos.id
          }, {
            $inc: {
              'productos.$.cantidad': -data.productos.cantidad
            }
          }));

        case 189:
          return _context.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Guardado con exito'
          }));

        case 190:
          _context.next = 195;
          break;

        case 192:
          _context.prev = 192;
          _context.t6 = _context["catch"](0);
          next(_context.t6);

        case 195:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 192], [11, 23, 27, 35], [28,, 30, 34], [51, 66, 70, 78], [71,, 73, 77], [86, 90, 94, 102], [95,, 97, 101], [112, 116, 120, 128], [121,, 123, 127], [133, 137, 141, 149], [142,, 144, 148], [156, 160, 164, 172], [165,, 167, 171]]);
};

inventarioVendedorController.finalizarDistribucion = function _callee2(req, res, next) {
  var data, inventario, distribucionActual, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator10, _step7, key, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator11, _step8, iterator, removeOrNotRemoveDistri, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator12, _step9, _iterator13, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator14, _step10, i, distribucionActiva;

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
            mensaje: 'No se encontro un inventario asociado a este codigo'
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
            mensaje: 'No se encontro una distribucion activa'
          }));

        case 12:
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context2.prev = 15;
          _iterator10 = data.productos[Symbol.iterator]();

        case 17:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator10.next()).done) {
            _context2.next = 122;
            break;
          }

          key = _step7.value;
          _context2.prev = 19;
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context2.prev = 23;
          _iterator11 = distribucionActual.productos[Symbol.iterator]();

        case 25:
          if (_iteratorNormalCompletion8 = (_step8 = _iterator11.next()).done) {
            _context2.next = 98;
            break;
          }

          iterator = _step8.value;

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
            mensaje: 'No puedes devolver mas de los productos que tienes en distribucion'
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
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          _context2.prev = 40;
          _iterator12 = removeOrNotRemoveDistri.productos[Symbol.iterator]();

        case 42:
          if (_iteratorNormalCompletion9 = (_step9 = _iterator12.next()).done) {
            _context2.next = 75;
            break;
          }

          _iterator13 = _step9.value;
          _iteratorNormalCompletion10 = true;
          _didIteratorError10 = false;
          _iteratorError10 = undefined;
          _context2.prev = 47;
          _iterator14 = data.productos[Symbol.iterator]();

        case 49:
          if (_iteratorNormalCompletion10 = (_step10 = _iterator14.next()).done) {
            _context2.next = 58;
            break;
          }

          i = _step10.value;

          if (!(i.id === _iterator13.id)) {
            _context2.next = 55;
            break;
          }

          if (!(_iterator13.cantidad === 0)) {
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
                id: _iterator13.id
              }
            }
          }));

        case 55:
          _iteratorNormalCompletion10 = true;
          _context2.next = 49;
          break;

        case 58:
          _context2.next = 64;
          break;

        case 60:
          _context2.prev = 60;
          _context2.t0 = _context2["catch"](47);
          _didIteratorError10 = true;
          _iteratorError10 = _context2.t0;

        case 64:
          _context2.prev = 64;
          _context2.prev = 65;

          if (!_iteratorNormalCompletion10 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }

        case 67:
          _context2.prev = 67;

          if (!_didIteratorError10) {
            _context2.next = 70;
            break;
          }

          throw _iteratorError10;

        case 70:
          return _context2.finish(67);

        case 71:
          return _context2.finish(64);

        case 72:
          _iteratorNormalCompletion9 = true;
          _context2.next = 42;
          break;

        case 75:
          _context2.next = 81;
          break;

        case 77:
          _context2.prev = 77;
          _context2.t1 = _context2["catch"](40);
          _didIteratorError9 = true;
          _iteratorError9 = _context2.t1;

        case 81:
          _context2.prev = 81;
          _context2.prev = 82;

          if (!_iteratorNormalCompletion9 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }

        case 84:
          _context2.prev = 84;

          if (!_didIteratorError9) {
            _context2.next = 87;
            break;
          }

          throw _iteratorError9;

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
          _iteratorNormalCompletion8 = true;
          _context2.next = 25;
          break;

        case 98:
          _context2.next = 104;
          break;

        case 100:
          _context2.prev = 100;
          _context2.t2 = _context2["catch"](23);
          _didIteratorError8 = true;
          _iteratorError8 = _context2.t2;

        case 104:
          _context2.prev = 104;
          _context2.prev = 105;

          if (!_iteratorNormalCompletion8 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 107:
          _context2.prev = 107;

          if (!_didIteratorError8) {
            _context2.next = 110;
            break;
          }

          throw _iteratorError8;

        case 110:
          return _context2.finish(107);

        case 111:
          return _context2.finish(104);

        case 112:
          return _context2.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Distribucion finalizada'
          }));

        case 115:
          _context2.prev = 115;
          _context2.t3 = _context2["catch"](19);
          console.log(_context2.t3);
          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Hubo un problema con los productos que intentas devolver'
          }));

        case 119:
          _iteratorNormalCompletion7 = true;
          _context2.next = 17;
          break;

        case 122:
          _context2.next = 128;
          break;

        case 124:
          _context2.prev = 124;
          _context2.t4 = _context2["catch"](15);
          _didIteratorError7 = true;
          _iteratorError7 = _context2.t4;

        case 128:
          _context2.prev = 128;
          _context2.prev = 129;

          if (!_iteratorNormalCompletion7 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }

        case 131:
          _context2.prev = 131;

          if (!_didIteratorError7) {
            _context2.next = 134;
            break;
          }

          throw _iteratorError7;

        case 134:
          return _context2.finish(131);

        case 135:
          return _context2.finish(128);

        case 136:
          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Hubo un problema con los productos en distribucion, comunicate con el administrador'
          }));

        case 139:
          _context2.prev = 139;
          _context2.t5 = _context2["catch"](0);
          next(_context2.t5);

        case 142:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 139], [15, 124, 128, 136], [19, 115], [23, 100, 104, 112], [40, 77, 81, 89], [47, 60, 64, 72], [65,, 67, 71], [82,, 84, 88], [105,, 107, 111], [129,, 131, 135]]);
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