const express = require('express');
const produccionController = require('../controllers/inventarioVendedorController');
const auth = require('../middlewares/loginAuth');
const distributionAuth = require('../middlewares/distributionAuth');
const router = express.Router();

router.post(
  '/',
  auth.verificarToken,
  distributionAuth.canFinishDelivery,
  produccionController.moveToDistribution
);
router.put(
  '/',
  auth.verificarToken,
  produccionController.finalizarDistribucion
);
router.get('/:id', auth.verificarToken, produccionController.getDistribution);
module.exports = router;
