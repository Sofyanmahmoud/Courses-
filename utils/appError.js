
class AppError extends Error {
    constructor(message, statusCode, statusText) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

// Create a helper function instead of a method on the class
const createAppError = (message, statusCode, statusText) => {
    return new AppError(message, statusCode, statusText);
}

module.exports = { AppError, createAppError };

