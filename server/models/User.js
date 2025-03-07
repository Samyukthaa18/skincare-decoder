const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  skinType: {
    type: String,
    enum: ['Oily', 'Dry', 'Sensitive', 'Combo', 'Acne prone', 'Don\'t know'],
    required: true
  },
  skinConcern: String,
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cycleStartDate: {
    type: Date,
    default: Date.now
  }
});

// Export the schema
module.exports = mongoose.model('User', UserSchema);
