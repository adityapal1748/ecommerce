const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controller/searchProduct');

// Search products
router.get('/search', searchProducts);

module.exports = router;
