const User = require('../models/users.js');
const Car = require('../models/car');

module.exports = {
  index: {
    get: async (req, res, next) => {
      const cars = await Car.find({});
      res.status(200).json(cars);
    },
    post: async (req, res, next) => {
      const owner = await User.findById(req.body.owner);
      const newCar = req.body;
      // req body has user so we delete that to make a new car
      delete newCar.owner;
      const car = new Car(newCar);
      car.owner = owner;
      // save new car
      await car.save();
      // add new car to user
      owner.cars.push(car);
      // save car to user
      await owner.save();
      res.status(200).json(car);
    },
  },
};
