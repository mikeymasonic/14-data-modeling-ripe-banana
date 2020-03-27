const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: String,
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true,
    min: 1888,
    max: 3000
  },
  cast: [castSchema]
}, {
  toJSON: {
    virtuals: true
  }
});

schema.methods.populateWithReviews =  async function() {
  const filmObject = JSON.parse(JSON.stringify(this));
  filmObject.reviews = await this.
    model('Review').find({ film: this._id });
  return filmObject;
};

module.exports = mongoose.model('Film', schema);
