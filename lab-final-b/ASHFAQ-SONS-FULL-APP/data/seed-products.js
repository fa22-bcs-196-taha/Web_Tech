const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

connectDB();

const sampleProducts = [
  { name: "Mixed Mithai Box (1kg)", price: 2800, category: "Sweets", description: "Assorted traditional sweets.", featured: true },
  { name: "Gulab Jamun (500g)", price: 1200, category: "Sweets", description: "Soft syrupy gulab jamun.", featured: true },
  { name: "Pista Barfi (500g)", price: 1800, category: "Sweets", description: "Premium pistachio barfi." },
  { name: "Fresh Cream Cake (2lb)", price: 2200, category: "Bakery", description: "Moist vanilla cake." },
  { name: "Chicken Tikka Pizza", price: 1499, category: "Pizza", description: "Large tikka pizza." },
  { name: "Gift Hamper Deluxe", price: 5000, category: "Gifts", description: "Luxury sweet box." }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('Sample products seeded!');
  process.exit();
};

seedDB();