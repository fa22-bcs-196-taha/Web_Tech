// config/db.js
const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/ashfaqsons')
    .then(() => {
      console.log('MongoDB Connected Successfully');
    })
    .catch((err) => {
      console.error('MongoDB Connection Error:', err.message);
      process.exit(1);
    });
};

module.exports = connectDB;