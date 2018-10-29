const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const {
  validateParam,
  validateBody,
  schemas,
} = require('../helpers/routeHelpers');

router
  .route('/')
  .get(UserController.index.get)
  .post(validateBody(schemas.userSchema), UserController.index.post);

router
  .route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UserController.user.getUser)
  .put(
    [
      validateParam(schemas.idSchema, 'userId'),
      validateBody(schemas.userSchema),
    ],
    UserController.user.replaceUser,
  )
  .patch(
    [
      validateParam(schemas.idSchema, 'userId'),
      validateBody(schemas.userSchemaOptional),
    ],
    UserController.user.updateUser,
  );

router
  .route('/:userId/cars')
  .get(
    validateParam(schemas.idSchema, 'userId'),
    UserController.user.getUserCars,
  )
  .post(
    [
      validateParam(schemas.idSchema, 'userId'),
      validateBody(schemas.carSchema),
    ],
    UserController.user.newUserCar,
  );

module.exports = router;
