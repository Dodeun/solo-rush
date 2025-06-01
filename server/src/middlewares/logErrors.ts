// Middleware for Error Logging
// Important: Error-handling middleware should be defined last, after other app.use() and routes calls.

import type { ErrorRequestHandler } from "express";

// Define a middleware function to log errors
export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
    // Log the error to the console for debugging purposes
    console.error(err);
    console.error("on req:", req.method, req.path);

    next(err);
};
