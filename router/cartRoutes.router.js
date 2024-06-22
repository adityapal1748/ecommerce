const express = require('express');
const router = express.Router();
const { addItemToCart, getCart,removeCartItem } = require('../controller/cart');
const jwtVerify = require('../middleware/jwtVerify');

// Add item to cart
router.post('/add', jwtVerify, addItemToCart);

// Get cart
router.get('/', jwtVerify, getCart);

// Remove cart item
router.delete('/remove', jwtVerify, removeCartItem);

module.exports = router;
