const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
}, {
  toJSON: {
    virtuals: true
  }
});

// virtual that references films
schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'actor'
});

module.exports = mongoose.model('Actor', schema);
