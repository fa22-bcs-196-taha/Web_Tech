// app.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Home Route - Featured + All Products with Pagination & Filter
app.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const category = req.query.category || '';
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Infinity;

    const filter = {
      price: { $gte: minPrice, $lte: maxPrice }
    };
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const categories = await Product.distinct('category');

    res.render('index', {
      title: 'Ashfaq Sons - Traditional Sweets & Bakery',
      products,
      categories,
      currentPage: page,
      totalPages,
      limit,
      category,
      minPrice,
      maxPrice,
      hasNext: page < totalPages,
      hasPrev: page > 1
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Dedicated Products Page (optional)
app.get('/products', async (req, res) => {
  // Same logic as above, or redirect to home
  res.redirect('/');
});

// Existing routes
app.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Ashfaq Sons - Checkout' });
});

app.get('/crud', (req, res) => {
  res.render('crud', { title: 'Ashfaq Sons - CRUD Manager' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});