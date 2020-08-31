const distributionAuth = {};
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
distributionAuth.canFinishDelivery = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      const data = {
        codigoUsuario: req.body.codigoUsuario,
        productos: req.body.productos,
        horaSalida: Date.now(),
        codigoInventario: req.body.codigoInventario,
      };
      let canMoveToDistribucion = false;
      const inventarioOfMicroaliado = await inventarioModel.findOne({
        _id: data.codigoInventario,
      });
      if (!inventarioOfMicroaliado) {
        return res.status(409).json({
          status: 'Error',
          message: 'El inventario no existe',
        });
      }
      for (const iterator of inventarioOfMicroaliado.productos) {
        if (iterator.id === data.productos.id) {
          if (iterator.cantidad < data.productos.cantidad) {
            return res.status(409).json({
              status: 'Error',
              message:
                'No puedes mandar esta cantidad a produccion, es mayor a la que hay en tu inventario',
            });
          }
        }
      }
      const usuario = await usuarioModel.findOne({
        codigo: data.codigoUsuario,
      });
      if (!usuario) {
        return res.status(409).json({
          status: 'Error',
          message: 'El usuario no existe',
        });
      }
      const productoExistente = await inventarioModel.findOne({
        'productos.id': data.productos.id,
      });
      if (!productoExistente) {
        return res.status(409).json({
          status: 'Error',
          message: 'El producto no esta en tu inventario',
        });
      }
      const usuarios = await usuarioModel.find({
        codigoMicroaliadoEncargado: inventarioOfMicroaliado.codigoUsuario,
      });
      for (const iterator of usuarios) {
        if (
          parseInt(iterator.codigo) == parseInt(data.codigoUsuario) ||
          parseInt(iterator.codigoMicroaliadoEncargado) ==
            parseInt(data.codigoUsuario)
        ) {
          canMoveToDistribucion = true;
        } else if (!canMoveToDistribucion) {
          return res.status(409).json({
            status: 'Error',
            message: 'Este vendedor no lo encontramos asociado a su inventario',
          });
        }
      }
      if (!inventarioOfMicroaliado) {
        return res.status(409).json({
          status: 'Error',
          message: 'No existe inventario para empezar la distribucion',
        });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'Error',
      message: 'Error con el servidor, comunicate con el admin',
    });
  }
};

module.exports = distributionAuth;
