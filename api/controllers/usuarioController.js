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
    return res.status(200).json({
      status: 'Success',
      mensaje: 'Registro exitoso',
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
        mensaje: 'El usuario no existe, comunicate con el administrador',
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
        mensaje:
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
    return res.status(200).json({
      resultado,
    });
  } catch (error) {
    next(error);
  }
};
usuarioController.consultarUsuarios = async (req, res, next) => {
  try {
    const resultado = await usuarioModel.find();
    return res.status(200).json({
      resultado,
    });
  } catch (error) {
    next(error);
  }
};
usuarioController.makeMicroaliado = async (req, res, next) => {
  try {
    const codigoUsuario = req.params.id;
    const usuario = await usuarioModel.find({ codigo: codigoUsuario });
    if (usuario < 1) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No se encontro al usuario',
      });
    } else {
      await usuarioModel.findOneAndUpdate(
        { codigo: codigoUsuario },
        { rol: 'microaliado' },
        { new: true }
      );
      return res.status(200).json({
        status: 'Success',
        mensaje: 'Modificado con exito',
      });
    }
  } catch (error) {
    next(error);
  }
};
usuarioController.asignarMicroaliadoToVendedor = async (req, res, next) => {
  try {
    const codigoUsuario = req.params.id;
    const codigoMicroaliado = req.body.codigo;
    const usuario = await usuarioModel.findOne({ codigo: codigoUsuario });
    const microaliado = await usuarioModel.findOne({
      codigo: codigoMicroaliado,
    });
    if (usuario.rol === 'microaliado') {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'No puedes asignarle un microaliado a otro microaliado',
      });
    } else {
      if (microaliado.rol !== 'microaliado') {
        return res.status(409).json({
          status: 'Error',
          mensaje:
            'El usuario no es un microaliado, no puedes asignarle un vendedor',
        });
      }
      await usuarioModel.findOneAndUpdate(
        { codigo: codigoUsuario },
        { $set: { codigoMicroaliadoEncargado: codigoMicroaliado } }
      );
      res.status(200).json({
        status: 'Success',
        mensaje: 'Modificacion exitosa',
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = usuarioController;
