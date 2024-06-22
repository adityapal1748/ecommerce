const Product = require("../models/product.model");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

// Search products
const searchProducts = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return sendErrorResponse(res, 'Query is required', 400);
    }

    try {
        const regex = new RegExp(query, 'i'); // 'i' makes the search case-insensitive
        // console.log(regex)
        const results = await Product.find({
            $or: [
                { name: regex }
            ]
        });
        sendSuccessResponse(res, results);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 'Error searching for products');
    }
};

module.exports = {
    searchProducts
};
