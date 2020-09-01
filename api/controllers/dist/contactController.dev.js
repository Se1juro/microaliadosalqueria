"use strict";

var contactController = {};
var password = process.env.PASSWORD_EMAIL;

var nodemailer = require('nodemailer');

contactController.sendEmail = function _callee(req, res, next) {
  var _req$body, nombre, email, mensaje, transporter, mailOptions, info;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nombre = _req$body.nombre, email = _req$body.email, mensaje = _req$body.mensaje;
          contentHTML = "\n        <h1>Informacion del usuario</h1>\n        <ul>\n            <li>Nombre del usuario: ".concat(nombre, "</li>\n            <li>Email: ").concat(email, "</li>\n        </ul>\n        <p>").concat(mensaje, "</p>\n    ");
          transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            auth: {
              user: 'daniel.msweb@gmail.com',
              pass: password
            }
          });
          mailOptions = {
            from: email,
            to: 'daniel.msweb@gmail.com',
            subject: 'Solicitud de contacto Microaliados APP',
            html: "\n        <h1>Informacion del usuario</h1>\n        <ul>\n            <li>Nombre del usuario: ".concat(nombre, "</li>\n            <li>Email: ").concat(email, "</li>\n        </ul>\n        <p>").concat(mensaje, "</p>\n    ")
          };
          _context.next = 7;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 7:
          info = _context.sent;

          if (!info.messageId) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            status: 'Success',
            message: 'Mensaje enviado correctamente'
          }));

        case 12:
          return _context.abrupt("return", res.status(409).json({
            status: 'Error',
            message: 'Hubo un error enviando tu correo'
          }));

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = contactController;