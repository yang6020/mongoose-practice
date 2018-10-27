const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const { validateParam, schemas } = require('../helpers/routeHelpers');

router
  .route('/')
  .get(UserController.index.get)
  .post(UserController.index.post);

router
  .route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UserController.user.getUser)
  .put(UserController.user.replaceUser)
  .patch(UserController.user.updateUser);

router
  .route('/:userId/cars')
  .get(UserController.user.getUserCars)
  .post(UserController.user.newUserCar);

module.exports = router;
