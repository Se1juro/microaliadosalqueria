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

inventoryServices.getInventory = function _callee(codigoReferencia) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/inventario/' + codigoReferencia, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};