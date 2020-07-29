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
productoAuth.errorDeleteSelf = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      if (decoded.id === req.params.id) {
        return res.status(401).json({
          status: 'Error',
          mensaje: 'Peticion no autorizada',
        });
      }
      next();
    });
  } catch (e) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
}
module.exports = productoAuth;
