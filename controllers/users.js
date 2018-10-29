const User = require('../models/users.js');
const Car = require('../models/car');
const helpers = require('../helpers/hash');

// Callback Method
// get: (req, res, next) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       next(err);
//     }
//     res.status(200).json(users);
//   });
// },

// Promise Method
// get: (req, res, next) => {
//   User.find({})
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       next(err);
//     });
// },

module.exports = {
  index: {
    // Async Await
    get: async (req, res, next) => {
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (err) {
        let error = new Error('Missing required fields');
        error.status = 400;
        next(error);
      }
    },

    post: async (req, res, next) => {
      try {
        console.log('hi');
        console.log(req.value);
        const hashedPassword = await helpers.hash(req.value.body.password);
        if (hashedPassword) {
          const newUser = new User({
            firstName: req.value.body.firstName,
            lastName: req.value.body.lastName,
            password: hashedPassword,
            email: req.value.body.email,
          });
          const user = await newUser.save();
          res.status(201).json(user);
        } else {
          let error = new Error('Could not hash password');
          next(error);
        }
      } catch (err) {
        let error = new Error('Could not make user');
        next(error);
      }
    },
  },
  user: {
    getUser: async (req, res, next) => {
      try {
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
      } catch (err) {
        let error = new Error('Cannot find user, it may not exist');
        error.status = 404;
        next(error);
      }
    },
    replaceUser: async (req, res, next) => {
      try {
        const { userId } = req.value.params;
        const newUser = req.body;
        const result = await User.findOneAndUpdate(userId, newUser);
        res.status(200).json(result);
      } catch (err) {
        let error = new Error('Cannot replace user, missing required fields');
        error.status = 404;
        next(error);
      }
    },
    updateUser: async (req, res, next) => {
      try {
        const { userId } = req.value.params;
        const newUser = req.body;
        const result = await User.findOneAndUpdate(userId, newUser);
        res.status(200).json(result);
      } catch (err) {
        let error = new Error('Cannot replace user, missing required fields');
        error.status = 404;
        next(error);
      }
    },
    getUserCars: async (req, res, next) => {
      try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user);
      } catch (err) {
        let error = new Error(
          'Could not get user cars, or they may not have any',
        );
        error.status = 404;
        next(error);
      }
    },
    newUserCar: async (req, res, next) => {
      try {
        const { userId } = req.params;
        const newCar = new Car(req.body);
        const user = await User.findById(userId);
        newCar.owner = user;
        // Save car
        await newCar.save();
        // Add car to users
        user.cars.push(newCar);
        // Save updated user
        await user.save();
        res.status(200).json(newCar);
      } catch (err) {
        next(err);
      }
    },
  },
};

// You can interact with mongoose 3 diff ways:
// 1) Callbacks
// 2) Promises
// 3) Async await (Promise)
