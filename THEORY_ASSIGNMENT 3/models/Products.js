// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Sweets', 'Bakery', 'Namkeen', 'Pizza', 'Gifts'],
    default: 'Sweets'
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Ashfaq+Sons'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);