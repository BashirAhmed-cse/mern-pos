const config = require("../config/config");

const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";

    // Handle Mongoose Validation Errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(el => el.message).join(", ");
    }

    // Handle Mongoose CastError (Invalid MongoDB ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Handle Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue);
        message = `Duplicate value for field: ${field}`;
    }

    return res.status(statusCode).json({
        status: statusCode,
        message,
        errorStack: config.nodeEnv === "development" ? err.stack : undefined,
    });
};

module.exports = globalErrorHandler;
