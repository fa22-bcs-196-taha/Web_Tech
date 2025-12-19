// data/sample-products.js
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

connectDB();

const sampleProducts = [
  {
    name: "Mixed Mithai Box (1kg)",
    price: 2800,
    category: "Sweets",
    description: "Assorted traditional Lahore sweets including barfi, gulab jamun, and laddu.",
    image: "https://via.placeholder.com/300x300?text=Mixed+Mithai",
    featured: true
  },
  {
    name: "Gulab Jamun (500g)",
    price: 1200,
    category: "Sweets",
    description: "Soft, syrupy gulab jamun made with pure desi ghee.",
    featured: true
  },
  {
    name: "Pista Barfi (500g)",
    price: 1800,
    category: "Sweets",
    description: "Premium pistachio barfi with rich flavor and texture."
  },
  {
    name: "Fresh Cream Cake (2lb)",
    price: 2200,
    category: "Bakery",
    description: "Moist vanilla cake with fresh cream topping."
  },
  {
    name: "Chicken Tikka Pizza",
    price: 1499,
    category: "Pizza",
    description: "Large pizza loaded with chicken tikka and cheese."
  },
  {
    name: "Gift Hamper Deluxe",
    price: 5000,
    category: "Gifts",
    description: "Luxury sweet box with dry fruits and premium mithai."
  }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('Sample products inserted!');
  process.exit();
};

seedDB();