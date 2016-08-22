const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const superhero = new Schema({
  name: {
    type: String,
    required: true
  },
  power: {
    type: [String],
  },
  sidekick: {
    type: String
  }
});

module.exports = mongoose.model(`Superhero`, superhero);