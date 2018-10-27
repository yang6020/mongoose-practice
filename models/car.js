const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Car = mongoose.model('car', carSchema);
module.exports = Car;
