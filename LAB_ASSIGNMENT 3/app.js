// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Ashfaq Sons - Traditional Sweets & Bakery Since 1980' });
});

app.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Ashfaq Sons - Checkout' });
});

app.get('/crud', (req, res) => {
  res.render('crud', { title: 'Ashfaq Sons - Posts CRUD Manager' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><p><a href="/">Go Home</a></p>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Ashfaq Sons Express app running at http://localhost:${PORT}`);
});