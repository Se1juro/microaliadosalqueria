"use strict";

var productoModel = require('../models/productoModel');

var productoController = {};

productoController.getAllProducts = function _callee(req, res, next) {
  var limit, page, productos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          limit = parseInt(req.query.limit) || 10;
          page = parseInt(req.query.page) || 1;
          _context.next = 5;
          return regeneratorRuntime.awrap(productoModel.paginate({}, {
            limit: limit,
            page: page
          }));

        case 5:
          productos = _context.sent;
          return _context.abrupt("return", res.status(200).json(productos));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

productoController.getProductsActive = function _callee2(req, res, next) {
  var limit, page, productos;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          limit = parseInt(req.query.limit) || 10;
          page = parseInt(req.query.page) || 1;
          _context2.next = 5;
          return regeneratorRuntime.awrap(productoModel.paginate({
            estado: true
          }, {
            limit: limit,
            page: page
          }));

        case 5:
          productos = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(productos));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

productoController.getProductByReference = function _callee3(req, res, next) {
  var codigoReferencia, producto;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          codigoReferencia = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(productoModel.find({
            codigoReferencia: codigoReferencia
          }));

        case 4:
          producto = _context3.sent;

          if (producto) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'El producto no existe, comuniquese con el administrador'
          }));

        case 7:
          return _context3.abrupt("return", res.status(200).json(producto));

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

productoController.crearProducto = function _callee4(req, res, next) {
  var error, data, valorData, comparativaProductos, producto;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          error = false;
          data = {
            codigoReferencia: req.body.codigoReferencia,
            descripcion: req.body.descripcion,
            aplicaIva: req.body.aplicaIva,
            precioUnitario: req.body.precioUnitario
          };
          valorData = Object.values(data);
          valorData.forEach(function (e) {
            if (e === '' || e === undefined) {
              error = true;
            }
          });

          if (!(error === false)) {
            _context4.next = 17;
            break;
          }

          _context4.next = 8;
          return regeneratorRuntime.awrap(productoModel.findOne({
            codigoReferencia: data.codigoReferencia
          }));

        case 8:
          comparativaProductos = _context4.sent;

          if (!comparativaProductos) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Ya existe un producto con esta referencia'
          }));

        case 11:
          producto = new productoModel(data);
          _context4.next = 14;
          return regeneratorRuntime.awrap(producto.save());

        case 14:
          res.status(200).json({
            status: 'Success',
            message: 'Producto insertado correctamente'
          });
          _context4.next = 19;
          break;

        case 17:
          if (!(error === true)) {
            _context4.next = 19;
            break;
          }

          return _context4.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Error con el producto'
          }));

        case 19:
          _context4.next = 24;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

productoController.editarProductoByReference = function _callee5(req, res, next) {
  var codigoReferencia, contador, data, _i, _Object$values, iterator, producto;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          codigoReferencia = req.params.id;
          contador = 0;
          data = {
            descripcion: req.body.descripcion,
            precioUnitario: req.body.precioUnitario,
            aplicaIva: req.body.aplicaIva
          };

          for (_i = 0, _Object$values = Object.values(req.body); _i < _Object$values.length; _i++) {
            iterator = _Object$values[_i];
            contador++;
          } //El numero de campos que debe tener el cuerpo del body para editar un producto debe ser de 5, si es menor a este numero, faltan datos.


          if (!(contador < 4)) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'Faltan campos para poder edita el producto'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(productoModel.findOne({
            codigoReferencia: codigoReferencia
          }));

        case 9:
          producto = _context5.sent;

          if (producto) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'No se ha encontrado el producto'
          }));

        case 12:
          _context5.next = 14;
          return regeneratorRuntime.awrap(productoModel.findOneAndUpdate({
            codigoReferencia: codigoReferencia
          }, {
            $set: data
          }, {
            "new": true
          }));

        case 14:
          return _context5.abrupt("return", res.status(200).json({
            status: 'Success',
            message: 'Producto Actualizado con exito'
          }));

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

productoController.eliminarProductoByReference = function _callee6(req, res, next) {
  var codigoReferencia, producto;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          codigoReferencia = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(productoModel.findOne({
            codigoReferencia: codigoReferencia
          }));

        case 4:
          producto = _context6.sent;

          if (producto) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'El producto que esta intentando eliminar no existe.'
          }));

        case 7:
          if (!(producto.estado === false)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'El producto que esta intentando eliminar esta deshabilitado.'
          }));

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(productoModel.findOneAndUpdate({
            codigoReferencia: codigoReferencia
          }, {
            estado: false
          }, {
            "new": true
          }, function (err) {
            if (err) {
              return res.status(409).json({
                status: 'Error',
                message: 'Hubo un error con la eliminacion del producto, comunique al administrador'
              });
            }
          }));

        case 11:
          return _context6.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Producto eliminado con exito'
          }));

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = productoController;