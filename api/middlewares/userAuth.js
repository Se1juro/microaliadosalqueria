const userAuth = {};
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
userAuth.canViewUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      const codigoUsuario = req.params.id;
      if (decoded.rol == 'admin' || codigoUsuario == decoded.codigoReferencia) {
        next();
      } else {
        return res.status(401).json({
          status: 'Error',
          Error: 'Peticion no autorizada',
        });
      }
      if (err) {
        console.log(err);
        return res.status(401).json({
          status: 'Error',
          Error: 'Peticion no autorizada',
        });
      }
    });
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
};
module.exports = userAuth;