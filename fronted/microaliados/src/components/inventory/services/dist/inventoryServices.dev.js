"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inventoryServices = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var inventoryServices = {};
exports.inventoryServices = inventoryServices;
var state = {
  token: localStorage.getItem('token')
};

inventoryServices.getInventory = function _callee(codigoReferencia, numPage, limitItems) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(numPage && limitItems)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/inventario/' + codigoReferencia + '?page=' + numPage + '&limit=' + limitItems, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          })["catch"](function (err) {
            return err.response;
          }));

        case 4:
          res = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/inventario/' + codigoReferencia, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          })["catch"](function (err) {
            return err.response;
          }));

        case 9:
          res = _context.sent;

        case 10:
          return _context.abrupt("return", res.data);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

inventoryServices.addedProductToInventory = function _callee2(userId, product, count) {
  var newData, stock, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (product) {
            stock = parseInt(count);
            newData = {
              codigoUsuario: userId,
              productos: {
                nomProduct: product.descripcion,
                id: product.codigoReferencia,
                cantidad: stock
              }
            };
          } else {
            newData = {
              codigoUsuario: userId
            };
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/inventario/', newData, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          })["catch"](function (err) {
            return err.response;
          }));

        case 4:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", _context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

inventoryServices.deleteProductOfInventory = function _callee3(idInventory, codeProduct) {
  var data, res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          data = {
            codigoProducto: codeProduct
          };
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("http://localhost:4000/inventario/".concat(idInventory), data, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 4:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", _context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

inventoryServices.increaseStock = function _callee4(idInventario, idUser, codeProduct, cant) {
  var stock, data, res;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          stock = parseInt(cant);
          data = {
            codigoUsuario: idUser,
            productos: [{
              id: codeProduct,
              cantidad: stock
            }]
          };
          _context4.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].put("http://localhost:4000/inventario/agregar/".concat(idInventario), data, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 5:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", _context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

inventoryServices.subtractStock = function _callee5(idUsario, idProduct, stock) {
  var data, res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          data = {
            codigoProducto: idProduct,
            cantidad: stock
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("http://localhost:4000/inventario/restar/".concat(idUsario), data, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 4:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", _context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};