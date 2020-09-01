"use strict";

var inventarioModel = require('../models/inventarioModel');

var productoModel = require('../models/productoModel');

var distribucionModel = require('../models/distribucionModel');

var usuarioModel = require('../models/usuarioModel');

var _require = require('../models/inventarioModel'),
    where = _require.where;

var inventarioController = {};

inventarioController.getInventarioByUser = function _callee(req, res, next) {
  var paginate, codigoUsuario, inventario, mapProducts, productosArray, productsInInventory, limit, page, productsToFront;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          paginate = function paginate(array, page_size, page_number) {
            return array.slice((page_number - 1) * page_size, page_number * page_size);
          };

          codigoUsuario = req.params.id;
          _context.next = 5;
          return regeneratorRuntime.awrap(inventarioModel.find({
            codigoUsuario: codigoUsuario
          }));

        case 5:
          inventario = _context.sent;

          if (!(inventario.length < 1)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se pudo encontrar el inventario'
          }));

        case 8:
          mapProducts = inventario[0].productos;
          productosArray = [];
          mapProducts.forEach(function (element) {
            productosArray.push(element.id);
          });
          productsInInventory = inventario[0].productos;
          limit = parseInt(req.query.limit || 5);
          page = parseInt(req.query.page || 1);
          productsToFront = paginate(productsInInventory, limit, page);
          return _context.abrupt("return", res.status(200).json({
            inventario: inventario,
            productsToFront: productsToFront,
            currentPage: page,
            totalPages: Math.ceil(productsInInventory.length / limit),
            totalDocuments: productsInInventory.length,
            itemForPage: limit
          }));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

inventarioController.crearInventario = function _callee2(req, res, next) {
  var data, usuarioCreador, productoExistente, inventarioExistente, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, inventario;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          data = {
            codigoUsuario: req.body.codigoUsuario,
            productos: req.body.productos
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: data.codigoUsuario
          }));

        case 4:
          usuarioCreador = _context2.sent;

          if (usuarioCreador) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario no existe'
          }));

        case 7:
          if (!(usuarioCreador.rol !== 'microaliado')) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario no tiene el rol requerido para asignarle un inventario'
          }));

        case 9:
          if (!data.productos) {
            _context2.next = 15;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(productoModel.findOne({
            codigoReferencia: data.productos.id
          }));

        case 12:
          productoExistente = _context2.sent;

          if (productoExistente) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No se encuentra un producto con este codigo de referencia'
          }));

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(inventarioModel.findOne({
            codigoUsuario: data.codigoUsuario
          }));

        case 17:
          inventarioExistente = _context2.sent;

          if (!inventarioExistente) {
            _context2.next = 50;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 22;
          _iterator = inventarioExistente.productos[Symbol.iterator]();

        case 24:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 31;
            break;
          }

          key = _step.value;

          if (!(key.id === data.productos.id)) {
            _context2.next = 28;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Ya tienes un producto de la misma referencia en tu inventario'
          }));

        case 28:
          _iteratorNormalCompletion = true;
          _context2.next = 24;
          break;

        case 31:
          _context2.next = 37;
          break;

        case 33:
          _context2.prev = 33;
          _context2.t0 = _context2["catch"](22);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 37:
          _context2.prev = 37;
          _context2.prev = 38;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 40:
          _context2.prev = 40;

          if (!_didIteratorError) {
            _context2.next = 43;
            break;
          }

          throw _iteratorError;

        case 43:
          return _context2.finish(40);

        case 44:
          return _context2.finish(37);

        case 45:
          _context2.next = 47;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            codigoUsuario: data.codigoUsuario
          }, {
            $push: {
              productos: data.productos
            }
          }));

        case 47:
          return _context2.abrupt("return", res.status(200).json({
            status: 'Success',
            message: 'Inventario actualizado'
          }));

        case 50:
          inventario = new inventarioModel(data);
          _context2.next = 53;
          return regeneratorRuntime.awrap(inventario.save());

        case 53:
          res.status(200).json({
            status: 'Success',
            message: 'Inventario almacenado con exito'
          });

        case 54:
          _context2.next = 59;
          break;

        case 56:
          _context2.prev = 56;
          _context2.t1 = _context2["catch"](0);
          next(_context2.t1);

        case 59:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 56], [22, 33, 37, 45], [38,, 40, 44]]);
};

inventarioController.eliminarProductoInventario = function _callee3(req, res, next) {
  var codigoProducto, productoExiste, inventario, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, iterator, productosToEliminar;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          codigoProducto = req.body.codigoProducto;
          productoExiste = false;
          console.log(req.params.id);
          console.log(req.body);
          _context3.next = 7;
          return regeneratorRuntime.awrap(inventarioModel.findById(req.params.id));

        case 7:
          inventario = _context3.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 11;

          for (_iterator2 = inventario.productos[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            iterator = _step2.value;

            if (iterator.id === codigoProducto) {
              productoExiste = true;
            }
          }

          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](11);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 19:
          _context3.prev = 19;
          _context3.prev = 20;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 22:
          _context3.prev = 22;

          if (!_didIteratorError2) {
            _context3.next = 25;
            break;
          }

          throw _iteratorError2;

        case 25:
          return _context3.finish(22);

        case 26:
          return _context3.finish(19);

        case 27:
          if (!(productoExiste === false)) {
            _context3.next = 30;
            break;
          }

          console.log('no esta en inventario');
          return _context3.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El producto no se encuentra en tu inventario'
          }));

        case 30:
          _context3.next = 32;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            _id: inventario._id
          }, {
            $pull: {
              productos: {
                id: codigoProducto
              }
            }
          }));

        case 32:
          productosToEliminar = _context3.sent;
          return _context3.abrupt("return", res.json({
            productosToEliminar: productosToEliminar,
            status: 'Success',
            message: 'Producto eliminado correctamente'
          }));

        case 36:
          _context3.prev = 36;
          _context3.t1 = _context3["catch"](0);
          next(_context3.t1);

        case 39:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 36], [11, 15, 19, 27], [20,, 22, 26]]);
};

inventarioController.restarCantidadProducto = function _callee4(req, res, next) {
  var codigoUsuario, data, inventario, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, key, resultado;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          codigoUsuario = req.params.id;
          data = {
            codigoProducto: req.body.codigoProducto,
            cantidad: req.body.cantidad
          };
          _context4.next = 5;
          return regeneratorRuntime.awrap(inventarioModel.findOne({
            codigoUsuario: codigoUsuario,
            'productos.id': data.codigoProducto
          }));

        case 5:
          inventario = _context4.sent;

          if (inventario) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No dispone de este producto en su inventario'
          }));

        case 8:
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context4.prev = 11;
          _iterator3 = inventario.productos[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context4.next = 21;
            break;
          }

          key = _step3.value;

          if (!(key.id === data.codigoProducto)) {
            _context4.next = 18;
            break;
          }

          if (!(key.cantidad < data.cantidad)) {
            _context4.next = 18;
            break;
          }

          return _context4.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No puede eliminar mas cantidad de la que tiene en el stock'
          }));

        case 18:
          _iteratorNormalCompletion3 = true;
          _context4.next = 13;
          break;

        case 21:
          _context4.next = 27;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](11);
          _didIteratorError3 = true;
          _iteratorError3 = _context4.t0;

        case 27:
          _context4.prev = 27;
          _context4.prev = 28;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 30:
          _context4.prev = 30;

          if (!_didIteratorError3) {
            _context4.next = 33;
            break;
          }

          throw _iteratorError3;

        case 33:
          return _context4.finish(30);

        case 34:
          return _context4.finish(27);

        case 35:
          _context4.next = 37;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            codigoUsuario: codigoUsuario,
            'productos.id': data.codigoProducto
          }, {
            $inc: {
              'productos.$.cantidad': -data.cantidad
            }
          }));

        case 37:
          resultado = _context4.sent;
          res.status(200).json({
            status: 'Success',
            message: 'Se ha restado a la cantidad del producto en tu inventario',
            resultado: resultado
          });
          _context4.next = 44;
          break;

        case 41:
          _context4.prev = 41;
          _context4.t1 = _context4["catch"](0);
          next(_context4.t1);

        case 44:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 41], [11, 23, 27, 35], [28,, 30, 34]]);
};

inventarioController.aumentarExistencia = function _callee5(req, res, next) {
  var codigoInventario, data, inventario, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, key, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, iterator;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          codigoInventario = req.params.id;
          data = {
            productos: req.body.productos
          };
          _context5.next = 5;
          return regeneratorRuntime.awrap(inventarioModel.findById(codigoInventario));

        case 5:
          inventario = _context5.sent;

          if (inventario) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No se encuentra el inventario'
          }));

        case 10:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context5.prev = 13;
          _iterator4 = inventario.productos[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context5.next = 49;
            break;
          }

          key = _step4.value;
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context5.prev = 20;
          _iterator5 = data.productos[Symbol.iterator]();

        case 22:
          if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
            _context5.next = 32;
            break;
          }

          iterator = _step5.value;

          if (!(key.id === iterator.id)) {
            _context5.next = 29;
            break;
          }

          _context5.next = 27;
          return regeneratorRuntime.awrap(inventarioModel.findOneAndUpdate({
            _id: codigoInventario,
            'productos.id': iterator.id
          }, {
            $inc: {
              'productos.$.cantidad': iterator.cantidad
            }
          }));

        case 27:
          _context5.next = 29;
          return regeneratorRuntime.awrap(distribucionModel.findOneAndUpdate({
            codigoInventario: codigoInventario,
            'productos.id': key.id
          }, {
            $set: {
              'productos.$.cantidadInventario': key.cantidad + iterator.cantidad
            }
          }, {
            "new": true
          }));

        case 29:
          _iteratorNormalCompletion5 = true;
          _context5.next = 22;
          break;

        case 32:
          _context5.next = 38;
          break;

        case 34:
          _context5.prev = 34;
          _context5.t0 = _context5["catch"](20);
          _didIteratorError5 = true;
          _iteratorError5 = _context5.t0;

        case 38:
          _context5.prev = 38;
          _context5.prev = 39;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 41:
          _context5.prev = 41;

          if (!_didIteratorError5) {
            _context5.next = 44;
            break;
          }

          throw _iteratorError5;

        case 44:
          return _context5.finish(41);

        case 45:
          return _context5.finish(38);

        case 46:
          _iteratorNormalCompletion4 = true;
          _context5.next = 15;
          break;

        case 49:
          _context5.next = 55;
          break;

        case 51:
          _context5.prev = 51;
          _context5.t1 = _context5["catch"](13);
          _didIteratorError4 = true;
          _iteratorError4 = _context5.t1;

        case 55:
          _context5.prev = 55;
          _context5.prev = 56;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 58:
          _context5.prev = 58;

          if (!_didIteratorError4) {
            _context5.next = 61;
            break;
          }

          throw _iteratorError4;

        case 61:
          return _context5.finish(58);

        case 62:
          return _context5.finish(55);

        case 63:
          return _context5.abrupt("return", res.status(200).json({
            status: 'Success',
            message: 'Inventario actualizado con exito'
          }));

        case 64:
          _context5.next = 69;
          break;

        case 66:
          _context5.prev = 66;
          _context5.t2 = _context5["catch"](0);
          next(_context5.t2);

        case 69:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 66], [13, 51, 55, 63], [20, 34, 38, 46], [39,, 41, 45], [56,, 58, 62]]);
};

module.exports = inventarioController;