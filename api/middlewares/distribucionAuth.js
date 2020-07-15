const distribucionAuth = {};
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
distribucionAuth.canMoveToDistribucion = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, secretKey, async (err, decoded) => {
      console.log(decoded);
    });
  } catch (err) {
    return res.status(401).json({
      status: 'Error',
      mensaje: 'Peticion no autorizada',
    });
  }
};
