// Utility function to handle success responses
const sendSuccessResponse = (res, data = {}, statusCode = 200,success = true) => {
    return res.status(statusCode).json({
        success,
        data
    });
};

// Utility function to handle error responses
const sendErrorResponse = (res, message = 'Server Error', statusCode = 500) => {
    return res.status(statusCode).json({ error: message });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};
