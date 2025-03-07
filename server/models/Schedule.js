// server/models/Schedule.js
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  morning: [String],
  evening: [String],
  cycleDay: {
    type: Number,
    default: 1
  },
  cycleStartDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('schedule', ScheduleSchema);