const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

// Add item to cart
const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return sendErrorResponse(res, 'Product not found', 404);
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            // If product exists in the cart, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If product does not exist, add it to the cart
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        sendSuccessResponse(res, cart);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res);
    }
};

// Get cart
const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
        if (!cart) {
            return sendErrorResponse(res, 'Cart not found', 404);
        }
        sendSuccessResponse(res, cart);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res);
    }
};



// Remove cart item
const removeCartItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return sendErrorResponse(res, 'Cart not found', 404);
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        sendSuccessResponse(res, cart);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res);
    }
};

module.exports = {
    addItemToCart,
    getCart,
    removeCartItem
};
