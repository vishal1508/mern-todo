'use strict';
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Pass the message to the base Error class
    this.statusCode = statusCode || 500; // Default to 500 if not provided
    this.isOperational = true; // Identify operational errors (not programming bugs)
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err); // Log the error for debugging

  return res.status(statusCode).json({
      success: false,
      status: statusCode,
      error: message,  // Use "error" key for clarity
  });
};



export { AppError, errorHandler };
