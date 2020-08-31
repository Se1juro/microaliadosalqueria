const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const loginAuth = {};
loginAuth.verificarToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log('Falta header authorization');
      return res.status(401).json({
        status: 'Error',
        mensaje: 'Peticion no autorizada',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === '' || null) {
      console.log('No hay token');
      return res.status(401).json({
        status: 'Error',
        mensaje: 'Peticion no autorizada',
      });
    }
    const payload = await jwt.verify(token, secretKey);
    if (!payload) {
      console.log('No se verifica');
      return res.status(401).json({
        status: 'Error',
        mensaje: 'Peticion no autorizada',
      });
    }
    req.userId = payload._id;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
};

module.exports = loginAuth;
