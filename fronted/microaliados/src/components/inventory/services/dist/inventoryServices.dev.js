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
          if (!(numPage && limitItems)) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/inventario/' + codigoReferencia + '?page=' + numPage + '&limit=' + limitItems, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 3:
          res = _context.sent;
          _context.next = 9;
          break;

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/inventario/' + codigoReferencia, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 8:
          res = _context.sent;

        case 9:
          return _context.abrupt("return", res.data);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

inventoryServices.addedProductToInventory = function _callee2(userId, product, count) {
  var newData, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          newData = {
            codigoUsuario: userId,
            productos: {
              nomProduct: product.descripcion,
              id: product.codigoReferencia,
              cantidad: count
            }
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/inventario/', newData, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
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