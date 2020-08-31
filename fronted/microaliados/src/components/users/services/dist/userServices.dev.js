"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userService = {};
exports.userService = userService;
var state = {
  token: localStorage.getItem('token')
};

userService.deleteUser = function _callee2(id, fn) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _sweetalert["default"].fire({
            title: '¿Estas seguro de eliminar este producto?',
            text: 'Esta accion puede no ser irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dd3333',
            confirmButtonText: 'Si, eliminalo'
          }).then(function _callee(result) {
            var res;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!result.value) {
                      _context.next = 18;
                      break;
                    }

                    _context.prev = 1;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(_axios["default"].put('http://localhost:4000/usuarios/delete/' + id, '', {
                      headers: {
                        Authorization: 'Bearer ' + state.token
                      }
                    }));

                  case 4:
                    res = _context.sent;

                    if (!(res.status === 200)) {
                      _context.next = 10;
                      break;
                    }

                    _context.next = 8;
                    return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                      title: 'Eliminado',
                      text: 'El usuario ha sido eliminado',
                      icon: 'success',
                      timer: 2000
                    }).then(fn()));

                  case 8:
                    _context.next = 12;
                    break;

                  case 10:
                    _context.next = 12;
                    return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                      icon: 'error',
                      title: 'Algo salio mal',
                      text: 'No pudimos eliminar el usuario',
                      timer: 2000
                    }));

                  case 12:
                    _context.next = 18;
                    break;

                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](1);
                    _context.next = 18;
                    return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                      icon: 'error',
                      title: 'Algo salio mal',
                      text: 'No pudimos eliminar el usuario',
                      timer: 2000
                    }));

                  case 18:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[1, 14]]);
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

userService.getUsers = function _callee3(viewAllUsers) {
  var res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (viewAllUsers) {
            _context3.next = 6;
            break;
          }

          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/usuarios/disponibles', {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 3:
          res = _context3.sent;
          _context3.next = 9;
          break;

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/usuarios', {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 8:
          res = _context3.sent;

        case 9:
          return _context3.abrupt("return", {
            usuarios: res.data,
            loading: false
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

userService.searchByCode = function _callee4(code) {
  var res;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (code) {
            _context4.next = 5;
            break;
          }

          _context4.next = 3;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos encontrar el usuario',
            timer: 2000
          }));

        case 3:
          _context4.next = 21;
          break;

        case 5:
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:4000/usuarios/' + code, {
            headers: {
              Authorization: 'Berer ' + state.token
            }
          })["catch"](function (err) {
            console.log(err.response);
          }));

        case 8:
          res = _context4.sent;

          if (!(res.status === 200)) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", res.data);

        case 13:
          _context4.next = 15;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos eliminar el usuario',
            timer: 2000
          }));

        case 15:
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](5);
          _context4.next = 21;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos encontrar el usuario',
            timer: 2000
          }));

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 17]]);
};

userService.makeMicroaliado = function _callee5(code, fn) {
  var res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(!code || code === '')) {
            _context5.next = 5;
            break;
          }

          _context5.next = 3;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No ejecutar la tarea, comunicate con el administrador',
            timer: 2000
          }));

        case 3:
          _context5.next = 18;
          break;

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/usuarios/convert/' + code, null, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 8:
          res = _context5.sent;

          if (!(res.status === 200)) {
            _context5.next = 12;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            title: 'Exitoso',
            text: 'Funcion ejecutada con exito',
            icon: 'success',
            timer: 2000
          }).then(fn()));

        case 12:
          _context5.next = 18;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](5);
          _context5.next = 18;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No ejecutar la tarea, comunicate con el administrador',
            timer: 2000
          }));

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 14]]);
};

userService.asignMicroToSeller = function _callee6(codeSeller, codeMicro, fn) {
  var microally, res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          microally = {
            codigo: codeMicro
          };
          _context6.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/usuarios/asignmicro/' + codeSeller, microally, {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
          }));

        case 4:
          res = _context6.sent;

          if (!(res.status === 200)) {
            _context6.next = 10;
            break;
          }

          _context6.next = 8;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            title: 'Exitoso',
            text: 'Funcion ejecutada con exito',
            icon: 'success',
            timer: 3000
          }).then(fn()));

        case 8:
          _context6.next = 12;
          break;

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No se ejecuto la tarea, comunicate con el administrador',
            timer: 3000
          }));

        case 12:
          _context6.next = 18;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 18;
          return regeneratorRuntime.awrap(_sweetalert["default"].fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No se ejecuto la tarea, comunicate con el administrador',
            timer: 3000
          }));

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 14]]);
};