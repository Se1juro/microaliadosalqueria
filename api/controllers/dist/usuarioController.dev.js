"use strict";

var usuarioModel = require('../models/usuarioModel');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var secretKey = process.env.SECRETKEY;
var usuarioController = {};
var BCRYPT_SALT_ROUNDS = 12;

usuarioController.registrarUsusario = function _callee(req, res, next) {
  var data, usuarioExistente, nuevoUsuario, datosToLocalStorage, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body);
          data = {
            codigo: req.body.codigo,
            password: req.body.password,
            nombre: req.body.nombre,
            documentoIdentidad: req.body.documento,
            departamento: req.body.departamento,
            municipio: req.body.municipio,
            telefono: req.body.telefono
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: data.codigo
          }));

        case 5:
          usuarioExistente = _context.sent;

          if (!usuarioExistente) {
            _context.next = 10;
            break;
          }

          console.log(usuarioExistente);
          console.log('Entro');
          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Ya existe un usuario con este codigo.'
          }));

        case 10:
          nuevoUsuario = new usuarioModel(data);
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(nuevoUsuario.password, BCRYPT_SALT_ROUNDS));

        case 13:
          nuevoUsuario.password = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(nuevoUsuario.save());

        case 16:
          datosToLocalStorage = {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            codigoReferencia: nuevoUsuario.codigo,
            rol: nuevoUsuario.rol
          };
          token = jwt.sign(datosToLocalStorage, secretKey);
          return _context.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Registro exitoso',
            token: token
          }));

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

usuarioController.iniciarSesion = function _callee2(req, res, next) {
  var codigoReferencia, usuario, matchPassword, datosToLocalStorage, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          codigoReferencia = req.body.codigoReferencia;
          _context2.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: codigoReferencia
          }));

        case 4:
          usuario = _context2.sent;

          if (usuario) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario no existe, comunicate con el administrador'
          }));

        case 7:
          if (usuario.estado) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Usuario inactivo, comunicate con el administrador'
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, usuario.password));

        case 13:
          matchPassword = _context2.sent;

          if (!matchPassword) {
            _context2.next = 20;
            break;
          }

          datosToLocalStorage = {
            id: usuario._id,
            nombre: usuario.nombre,
            codigoReferencia: usuario.codigo,
            rol: usuario.rol
          };
          token = jwt.sign(datosToLocalStorage, secretKey);
          return _context2.abrupt("return", res.status(200).json({
            datosToLocalStorage: datosToLocalStorage,
            token: token
          }));

        case 20:
          return _context2.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'Hubo un error en el inicio de sesion, comunicate con el administrador'
          }));

        case 21:
          _context2.next = 26;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

usuarioController.consultarUsuariosByCodigo = function _callee3(req, res, next) {
  var codigoUsuario, resultado;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          codigoUsuario = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: codigoUsuario
          }));

        case 4:
          resultado = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            resultado: resultado
          }));

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

usuarioController.consultarUsuarios = function _callee4(req, res, next) {
  var resultado;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(usuarioModel.find());

        case 3:
          resultado = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            resultado: resultado
          }));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

usuarioController.usersActives = function _callee5(req, res, next) {
  var resultado;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(usuarioModel.find({
            estado: true
          }));

        case 3:
          resultado = _context5.sent;
          return _context5.abrupt("return", res.status(200).json({
            resultado: resultado
          }));

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

usuarioController.makeMicroaliado = function _callee6(req, res, next) {
  var codigoUsuario, usuario;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          codigoUsuario = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.find({
            codigo: codigoUsuario
          }));

        case 4:
          usuario = _context6.sent;

          if (!(usuario < 1)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No se encontro al usuario'
          }));

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(usuarioModel.findOneAndUpdate({
            codigo: codigoUsuario
          }, {
            rol: 'microaliado'
          }, {
            "new": true
          }));

        case 11:
          return _context6.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Modificado con exito'
          }));

        case 12:
          _context6.next = 17;
          break;

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

usuarioController.asignarMicroaliadoToVendedor = function _callee7(req, res, next) {
  var codigoUsuario, codigoMicroaliado, usuario, microaliado;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          codigoUsuario = req.params.id;
          codigoMicroaliado = req.body.codigo;
          _context7.next = 5;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: codigoUsuario
          }));

        case 5:
          usuario = _context7.sent;

          if (usuario) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No existe este usuario'
          }));

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap(usuarioModel.findOne({
            codigo: codigoMicroaliado
          }));

        case 10:
          microaliado = _context7.sent;

          if (microaliado) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No existe este microaliado'
          }));

        case 15:
          if (!(usuario.rol === 'microaliado')) {
            _context7.next = 19;
            break;
          }

          return _context7.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'No puedes asignarle un microaliado a otro microaliado'
          }));

        case 19:
          if (!(microaliado.rol !== 'microaliado')) {
            _context7.next = 21;
            break;
          }

          return _context7.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario no es un microaliado, no puedes asignarle un vendedor'
          }));

        case 21:
          _context7.next = 23;
          return regeneratorRuntime.awrap(usuarioModel.findOneAndUpdate({
            codigo: codigoUsuario
          }, {
            $set: {
              codigoMicroaliadoEncargado: codigoMicroaliado
            }
          }));

        case 23:
          res.status(200).json({
            status: 'Success',
            mensaje: 'Modificacion exitosa'
          });

        case 24:
          _context7.next = 29;
          break;

        case 26:
          _context7.prev = 26;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);

        case 29:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 26]]);
};

usuarioController.deleteUser = function _callee8(req, res, next) {
  var id, userExists;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.findByIdAndUpdate(id));

        case 4:
          userExists = _context8.sent;

          if (!userExists) {
            _context8.next = 13;
            break;
          }

          if (userExists.estado) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario ya se encuentra inactivo'
          }));

        case 8:
          _context8.next = 10;
          return regeneratorRuntime.awrap(usuarioModel.findByIdAndUpdate(id, {
            estado: false
          }, {
            "new": true
          }));

        case 10:
          return _context8.abrupt("return", res.status(200).json({
            status: 'Success',
            mensaje: 'Se ha modificado el usuario con exito'
          }));

        case 13:
          return _context8.abrupt("return", res.status(409).json({
            status: 'Error',
            mensaje: 'El usuario que intenta modificar no existe'
          }));

        case 14:
          _context8.next = 19;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = usuarioController;