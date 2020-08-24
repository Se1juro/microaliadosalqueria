"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatePagination = void 0;
var StatePagination = {};
exports.StatePagination = StatePagination;

StatePagination.generatePagination = function _callee(totalPage, countSelect) {
  var rows, i, totalItems, x;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rows = [];

          for (i = 1; i <= totalPage; i++) {
            rows.push(i);
          }

          totalItems = [];

          for (x = 1; x <= countSelect; x++) {
            if (x % 5 === 0) {
              totalItems.push(x);
            }
          }

          return _context.abrupt("return", {
            totalItems: totalItems,
            rows: rows
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};