const logger = require('../utils/logger');

// Middleware to log responses
function responseLogger(req, res, next) {
    // Save the original send method to allow logging after the response is sent
    const originalSend = res.send;

    // Overriding the res.send method to capture the response body
    res.send = function (body) {
        // Log both request and response details
        console.log('Sending Response Body:', body);  // Log the body being sent
        logger.info('Response sent', {
            method: req.method,
            url: req.originalUrl,  // full URL with query parameters
            statusCode: res.statusCode,
            responseBody: body,    // The body of the response
            requestBody: req.body, // The body of the request (if present)
            queryParams: req.query, // The query parameters in the URL
            headers: req.headers,  // The request headers
            timestamp: new Date().toISOString(), // Timestamp when the response is sent
        });

        // Call the original send method to send the response
        return originalSend.call(this, body);
    };

    // Proceed to the next middleware or route handler
    next();
}

module.exports = responseLogger;
