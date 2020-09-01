"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactService = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contactService = {};
exports.contactService = contactService;

contactService.sendEmail = function _callee(name, email, message) {
  var data, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          data = {
            nombre: name,
            email: email,
            mensaje: message
          };
          res = _axios["default"].post('http://localhost:4000/contact/', data);
          return _context.abrupt("return", res);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};