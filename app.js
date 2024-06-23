const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./router/authRoutes.router');
const searchRoutes = require('./router/searchRoutes.router'); 
const cartRoutes = require('./router/cartRoutes.router'); 
const paymentRoutes = require("./router/payment.router")
const limiter = require('./middleware/ratelimiter');
require('dotenv').config();
require('./mocks/stripe')

const app = express();

// Connect to database
connectDB();

app.use(limiter);

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users',authRoutes);
app.use('/api/items',searchRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/payments',paymentRoutes);
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
