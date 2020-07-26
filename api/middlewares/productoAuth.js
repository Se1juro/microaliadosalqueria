const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const productoAuth = {};
productoAuth.canViewAllProducts = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      if (decoded.rol !== 'admin') {
        return res.status(401).json({
          status: 'Error',
          mensaje: 'Peticion no autorizada',
        });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
};
productoAuth.canPostProduct = async (req, res, next) => {
  try {
    const data = {
      codigoReferencia: req.body.codigoReferencia,
      descripcion: req.body.descripcion,
      aplicaIva: req.body.aplicaIva,
      precioUnitario: req.body.precioUnitario,
    };
    const valorData = Object.values(data);
    valorData.forEach((e) => {
      if (e === '' || e === undefined) {
        return res.status(409).json({
          status: 'Error',
          mensaje: 'Peticion no autorizada',
        });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(409).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
};
module.exports = productoAuth;
