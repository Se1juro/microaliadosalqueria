"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distributionService = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var distributionService = {};
exports.distributionService = distributionService;
var state = {
  token: localStorage.getItem('token')
};

distributionService.getDistribution = function _callee(userId) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:4000/distribucion/".concat(userId), {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          })["catch"](function (err) {
            return err.response;
          }));

        case 3:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

distributionService.moveToDistribution = function _callee2(idUser, product, count, idInventario) {
  var cantidad, data, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          cantidad = parseInt(count);
          data = {
            codigoUsuario: idUser,
            productos: {
              nomProduct: product.nomProduct,
              id: product.id,
              cantidad: cantidad
            },
            codigoInventario: idInventario
          };
          res = _axios["default"].post('http://localhost:4000/distribucion/', data, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          })["catch"](function (err) {
            return err.response;
          });
          return _context2.abrupt("return", res);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", _context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

distributionService.finishDelivery = function _callee3(idUser, product, idInventario, count) {
  var cantidad, data, res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          cantidad = parseInt(count);
          data = {
            codigoUsuario: idUser,
            codigoInventario: idInventario,
            productos: [{
              id: product.id,
              cantidad: cantidad
            }]
          };
          res = _axios["default"].put('http://localhost:4000/distribucion/', data, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          })["catch"](function (err) {
            return err.response;
          });
          return _context3.abrupt("return", res);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", _context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};