const express = require('express');
const router = express.Router();
const CarController = require('../controllers/cars');
const { validateBody, schemas } = require('../helpers/routeHelpers');
router
  .route('/')
  .get(CarController.index.get)
  .post(validateBody(schemas.newCarSchema), CarController.index.post);

module.exports = router;
