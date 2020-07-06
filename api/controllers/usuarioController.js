const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'DvTGB0esek4s';
const usuarioController = {};
const BCRYPT_SALT_ROUNDS = 12;
usuarioController.registrarUsusario = async (req, res, next) => {
  try {
    const data = {
      codigo: req.body.codigo,
      password: req.body.password,
      nombre: req.body.nombre,
      documentoIdentidad: req.body.documento,
      departamento: req.body.departamento,
      municipio: req.body.municipio,
      telefono: req.body.telefono,
    };
    const nuevoUsuario = new usuarioModel(data);
    const passwordHash = await bcrypt.hash(
      nuevoUsuario.password,
      BCRYPT_SALT_ROUNDS
    );
    nuevoUsuario.password = passwordHash;
    await nuevoUsuario.save();
    res.status(200).json({
      status: 'Success',
      message: 'Usuario registrado con exito',
    });
  } catch (error) {
    next(error);
  }
};
usuarioController.iniciarSesion = async (req, res, next) => {
  try {
    const { codigo } = req.body;
    const usuario = await usuarioModel.findOne({ codigo });
    if (!usuario) {
      return res.status(409).json({
        status: 'Error',
        message:
          'El usuario no existe, comuniquese con el administrador del sistema',
      });
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      usuario.password
    );
    if (matchPassword) {
      const datosToLocalStorage = {
        id: usuario._id,
        codigoReferencia: usuario.codigo,
      };
      const token = jwt.sign(datosToLocalStorage, secretKey);
      return res.status(200).json({ datosToLocalStorage, token });
    } else {
      return res.status(409).json({
        status: 'Error',
        message:
          'Hubo un error en el inicio de sesion, comunicate con el administrador',
      });
    }
  } catch (error) {
    next(error);
  }
};
usuarioController.consultarUsuariosByCodigo = async (req, res, next) => {
  try {
    const codigoUsuario = req.params.id;
    const resultado = await usuarioModel.findOne({ codigo: codigoUsuario });
    res.status(200).json({
      resultado,
    });
  } catch (error) {
    next(error);
  }
};
usuarioController.consultarUsuarios = async (req, res, next) => {
  try {
    const resultado = await usuarioModel.find();
    res.status(200).json({
      resultado,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = usuarioController;
