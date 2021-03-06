let mongoose = require('mongoose');

let Product = mongoose.model('Product', {
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = { Product };
