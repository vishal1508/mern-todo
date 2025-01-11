class AppError extends Error {
    constructor(message, statusCode) {
      super(message); // Pass the message to the base Error class
      this.statusCode = statusCode; // Add a statusCode property
      this.isOperational = true; // Identify operational errors (not programming bugs)
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
  }
  
export {AppError};