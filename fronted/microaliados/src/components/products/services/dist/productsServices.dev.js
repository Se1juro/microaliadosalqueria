"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsServices = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productsServices = {};
exports.productsServices = productsServices;
var state = {
  token: localStorage.getItem('token')
};

productsServices.getProducts = function _callee(viewAllProducts, numPage, limit) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (viewAllProducts) {
            _context.next = 12;
            break;
          }

          if (!(numPage && limit)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/productos/disponibles?page=' + numPage + '&limit=' + limit, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 4:
          res = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/productos/disponibles', {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 9:
          res = _context.sent;

        case 10:
          _context.next = 21;
          break;

        case 12:
          if (!(numPage || limit)) {
            _context.next = 18;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/productos?page=' + numPage + '&limit=' + limit, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 15:
          res = _context.sent;
          _context.next = 21;
          break;

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/productos', {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 20:
          res = _context.sent;

        case 21:
          return _context.abrupt("return", {
            productos: res.data,
            loading: false
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
};

productsServices.deleteProduct = function _callee3(id, fn) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _sweetalert["default"].fire({
            title: '¿Estas seguro de eliminar este producto?',
            text: 'Esta accion puede no ser irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo'
          }).then(function _callee2(result) {
            var res;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!result.value) {
                      _context2.next = 18;
                      break;
                    }

                    _context2.prev = 1;
                    _context2.next = 4;
                    return regeneratorRuntime.awrap(_axios["default"]["delete"]('http://localhost:4000/productos/' + id, {
                      headers: {
                        Authorization: 'Bearer ' + state.token
                      }
                    }));

                  case 4:
                    res = _context2.sent;

                    if (!(res.status === 200)) {
                      _context2.next = 10;
                      break;
                    }

                    _context2.next = 8;
                    return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                      title: 'Eliminado',
                      icon: 'success',
                      text: 'Tu producto ha sido eliminado',
                      timer: 2000
                    }).then(fn()));

                  case 8:
                    _context2.next = 12;
                    break;

                  case 10:
                    _context2.next = 12;
                    return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                      icon: 'error',
                      title: 'Algo salio mal',
                      text: 'No pudimos eliminar tu producto',
                      timer: 2000
                    }));

                  case 12:
                    _context2.next = 18;
                    break;

                  case 14:
                    _context2.prev = 14;
                    _context2.t0 = _context2["catch"](1);
                    _context2.next = 18;
                    return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                      icon: 'error',
                      title: 'Algo salio mal',
                      text: 'No pudimos eliminar tu producto',
                      timer: 2000
                    }));

                  case 18:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[1, 14]]);
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

productsServices.updateProduct = function _callee4(codigoReferencia, newProduct) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put('http://localhost:4000/productos/' + codigoReferencia, newProduct, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }).then(function (res) {
            try {
              if (res.status === 200) {
                _sweetalert["default"].fire({
                  title: 'Registro exitoso',
                  text: 'Producto guardado con exito',
                  icon: 'success',
                  timer: 2000
                }).then(function () {
                  return window.location.href = '/productos';
                });
              } else {
                _sweetalert["default"].fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo salio mal, comunicate con el administrador',
                  timer: 2000
                });
              }
            } catch (error) {
              _sweetalert["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, comunicate con el administrador',
                timer: 2000
              });
            }
          }));

        case 3:
          _context4.next = 8;
          break;

        case 5:
          _context4.prev = 5;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

productsServices.createProduct = function _callee5(newProduct) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/productos', newProduct, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }).then(function (res) {
            if (res.status === 200) {
              _sweetalert["default"].fire({
                title: 'Registro exitoso',
                text: 'Producto guardado con exito',
                icon: 'success',
                timer: 2000
              }).then(function () {
                return window.location.href = '/productos';
              });
            } else {
              _sweetalert["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, comunicate con el administrador',
                timer: 2000
              });
            }
          }));

        case 3:
          _context5.next = 8;
          break;

        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", _context5.t0);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

productsServices.getProductByCode = function _callee6(productId) {
  var res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:4000/productos/".concat(productId), {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 3:
          res = _context6.sent;
          return _context6.abrupt("return", res);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", _context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};