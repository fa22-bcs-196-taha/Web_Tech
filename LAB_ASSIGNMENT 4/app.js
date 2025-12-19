// Add after existing routes

// ADMIN ROUTES
app.get('/admin', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.render('admin/dashboard', {
      layout: 'admin-layout',
      title: 'Dashboard',
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

// CREATE
app.post('/admin/products/add', async (req, res) => {
  try {
    const { name, price, category, description, image, featured } = req.body;
    await Product.create({
      name, price, category, description,
      image: image || 'https://via.placeholder.com/300x300?text=New+Product',
      featured: featured === 'on'
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error adding product');
  }
});

// UPDATE
app.post('/admin/products/edit/:id', async (req, res) => {
  try {
    const { name, price, category, description, image, featured } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name, price, category, description,
      image: image || undefined,
      featured: featured === 'on'
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error updating product');
  }
});

// DELETE
app.post('/admin/products/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error deleting product');
  }
});

// Body parser for forms
app.use(express.urlencoded({ extended: true }));