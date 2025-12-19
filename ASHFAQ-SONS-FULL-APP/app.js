const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // For form data in admin CRUD

// PUBLIC ROUTES

// Home Page - Dynamic Products with Pagination & Filtering
app.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const category = req.query.category || '';
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Infinity;

    const filter = { price: { $gte: minPrice } };
    if (maxPrice !== Infinity) filter.price.$lte = maxPrice;
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const categories = await Product.distinct('category');

    res.render('layout', {
      title: 'Ashfaq Sons - Traditional Sweets & Bakery',
      content: 'index', // This includes views/index.ejs inside layout.ejs
      products,
      categories,
      currentPage: page,
      totalPages,
      category,
      minPrice: minPrice === 0 ? '' : minPrice,
      maxPrice: maxPrice === Infinity ? '' : maxPrice,
      hasPrev: page > 1,
      hasNext: page < totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Checkout Page
app.get('/checkout', (req, res) => {
  res.render('layout', {
    title: 'Ashfaq Sons - Checkout',
    content: 'checkout' // Includes views/checkout.ejs
  });
});

// CRUD Manager Page
app.get('/crud', (req, res) => {
  res.render('layout', {
    title: 'Ashfaq Sons - Posts CRUD Manager',
    content: 'crud' // Includes views/crud.ejs
  });
});

// ADMIN ROUTES

app.get('/admin', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.render('admin/dashboard', {
      layout: 'admin-layout', // Special layout for admin
      title: 'Admin Dashboard',
      page: 'dashboard',
      totalProducts
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/admin/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products', {
      layout: 'admin-layout',
      title: 'Manage Products',
      page: 'products',
      products
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/admin/products/add', (req, res) => {
  res.render('admin/add-product', {
    layout: 'admin-layout',
    title: 'Add New Product',
    page: 'products',
    product: null
  });
});

app.get('/admin/products/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('admin/edit-product', {
      layout: 'admin-layout',
      title: 'Edit Product',
      page: 'products',
      product
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// CREATE Product
app.post('/admin/products/add', async (req, res) => {
  try {
    const { name, price, category, description, image, featured } = req.body;
    await Product.create({
      name,
      price,
      category,
      description,
      image: image || 'https://via.placeholder.com/300x300?text=New+Product',
      featured: featured === 'on'
    });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding product');
  }
});

// UPDATE Product
app.post('/admin/products/edit/:id', async (req, res) => {
  try {
    const { name, price, category, description, image, featured } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      category,
      description,
      image: image || undefined,
      featured: featured === 'on'
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error updating product');
  }
});

// DELETE Product
app.post('/admin/products/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error deleting product');
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('layout', {
    title: 'Page Not Found',
    content: '404' // You can create a 404.ejs if you want
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});