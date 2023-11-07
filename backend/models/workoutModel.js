const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,

    default: 'default'
  },
  reps: {
    type: Number,

    default: 0
  },
  load: {
    type: Number,

    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);