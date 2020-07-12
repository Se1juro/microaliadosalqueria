const userAuth = {};
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
userAuth.canViewUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      console.log(decoded);
    });
  } catch (error) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
};
module.exports = userAuth;
